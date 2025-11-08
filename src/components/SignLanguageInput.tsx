import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Loader2 } from "lucide-react";
import { SignLanguageRecognizer } from "@/utils/signLanguageRecognition";

interface SignLanguageInputProps {
  onSignLanguageDetected?: (text: string) => void;
  onTextInput?: (text: string) => void;
}

type Detection = { text: string; confidence: number };

const STABILITY_WINDOW = 7; // number of recent detections to consider
const STABILITY_REQUIRED = 3; // minimum votes to accept
const CONFIDENCE_THRESHOLD = 0.5; // minimum confidence to include in buffer
const ACCEPT_CONFIDENCE = 0.6; // confidence to accept a single detection (if very confident)
const DEBOUNCE_MS = 300; // minor debounce for UI updates

export function SignLanguageInput({ onSignLanguageDetected, onTextInput }: SignLanguageInputProps) {
  const [inputMethod, setInputMethod] = useState<"type" | "sign">("type");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedSignText, setDetectedSignText] = useState<string>("");
  const [cameraError, setCameraError] = useState<string>("");
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [inputText, setInputText] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognizerRef = useRef<SignLanguageRecognizer | null>(null);
  const rafRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  // rolling buffer for stability
  const bufferRef = useRef<Detection[]>([]);
  const lastEmittedRef = useRef<string | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    mountedRef.current = true;
    // Lazy initialize recognizer instance
    try {
      recognizerRef.current = new SignLanguageRecognizer();
    } catch (err) {
      console.warn("Failed to instantiate recognizer:", err);
      recognizerRef.current = null;
    }

    return () => {
      mountedRef.current = false;
      stopEverything();
      if (recognizerRef.current) {
        try {
          recognizerRef.current.stop?.();
        } catch (e) {
          console.warn("Error stopping recognizer:", e);
        }
        recognizerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper: normalize text for voting
  const normalize = (s: string) => s.trim().toLowerCase();

  // helper: majority/mode of buffer (counts normalized strings)
  const computeStableDetection = () => {
    const buf = bufferRef.current;
    if (!buf.length) return null;
    const counts = new Map<string, { count: number; avgConfidence: number }>();
    for (const d of buf) {
      const n = normalize(d.text || "");
      if (!n) continue;
      const entry = counts.get(n) || { count: 0, avgConfidence: 0 };
      entry.count += 1;
      entry.avgConfidence = (entry.avgConfidence * (entry.count - 1) + d.confidence) / entry.count;
      counts.set(n, entry);
    }
    if (!counts.size) return null;
    // find top entry
    let bestText: string | null = null;
    let bestCount = 0;
    let bestConf = 0;
    counts.forEach((v, k) => {
      if (v.count > bestCount || (v.count === bestCount && v.avgConfidence > bestConf)) {
        bestText = k;
        bestCount = v.count;
        bestConf = v.avgConfidence;
      }
    });
    if (!bestText) return null;
    return { text: bestText, count: bestCount, avgConfidence: bestConf };
  };

  // push new detection into buffer (keeps max STABILITY_WINDOW)
  const pushDetection = (d: Detection) => {
    if (!d.text) return;
    // ignore very low confidence results
    if (typeof d.confidence === "number" && d.confidence < CONFIDENCE_THRESHOLD) return;
    bufferRef.current.push(d);
    if (bufferRef.current.length > STABILITY_WINDOW) bufferRef.current.shift();
  };

  // main recognition animation loop
  const recognitionLoop = async () => {
    if (!mountedRef.current) return;
    const video = videoRef.current;
    const recognizer = recognizerRef.current;
    if (!video || !recognizer) {
      rafRef.current = requestAnimationFrame(recognitionLoop);
      return;
    }
    try {
      // prefer a captureFrame API if available (synchronous-ish)
      let result: { text?: string; confidence?: number; debug?: string } | null = null;
      if (typeof recognizer.captureFrame === "function") {
        // captureFrame may internally use the video element
        // captureFrame should return { text, confidence }
        result = await recognizer.captureFrame();
      } else {
        // no recognizer method, bail
        throw new Error("Recognizer has no captureFrame method");
      }

      if (result) {
        const text = String(result.text || "").trim();
        const confidence = typeof result.confidence === "number" ? result.confidence : 0.6;
        // push for stability
        pushDetection({ text, confidence });
        // update debug info occasionally (throttle)
        const now = Date.now();
        if (now - lastUpdateTimeRef.current > DEBOUNCE_MS) {
          lastUpdateTimeRef.current = now;
          setDebugInfo(result.debug ? String(result.debug) : `${text || "—"} • ${Math.round(confidence * 100)}%`);
        }

        // decision: if very confident on single frame, accept immediately
        if (confidence >= ACCEPT_CONFIDENCE && text) {
          // also require that it's not just noise toggling too fast
          if (text !== lastEmittedRef.current) {
            acceptDetection(text);
          }
        } else {
          // otherwise compute stable detection from buffer
          const stable = computeStableDetection();
          if (stable && stable.count >= STABILITY_REQUIRED) {
            // if stable and different from last emitted, accept
            if (stable.text !== lastEmittedRef.current) {
              acceptDetection(stable.text);
            } else {
              // update UI to show current detection even if same
              setDetectedSignText(stable.text);
            }
          }
        }
      }
    } catch (err) {
      // non-fatal: keep loop running but show debug
      console.error("Recognition loop error:", err);
      setDebugInfo(String((err as Error).message || "Recognition error"));
    } finally {
      rafRef.current = requestAnimationFrame(recognitionLoop);
    }
  };

  const acceptDetection = (text: string) => {
    if (!mountedRef.current) return;
    lastEmittedRef.current = text;
    setDetectedSignText(text);
    setInputText(text);
    setIsProcessing(false);
    setDebugInfo(`Accepted: ${text}`);
    // emit upward
    try {
      onSignLanguageDetected?.(text);
    } catch (e) {
      console.warn("onSignLanguageDetected handler threw:", e);
    }
  };

  // start recognition loop (doesn't start camera)
  const startRecognitionLoop = () => {
    if (rafRef.current != null) return;
    setRecognitionActive(true);
    setIsProcessing(false);
    bufferRef.current = [];
    lastEmittedRef.current = null;
    rafRef.current = requestAnimationFrame(recognitionLoop);
  };

  const stopRecognitionLoop = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRecognitionActive(false);
    setIsProcessing(false);
    bufferRef.current = [];
  };

  const enableCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      const msg = "Camera not supported in this browser.";
      setCameraError(msg);
      alert(msg);
      return;
    }

    setCameraError("");
    setIsProcessing(true);

    // cleanup any existing
    stopEverything();

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (!mountedRef.current) {
        // component may have unmounted while awaiting permission
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // ensure playsInline and muted for autoplay
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        try {
          await videoRef.current.play();
        } catch (err) {
          // autoplay may be blocked; still continue
          console.warn("Video play() failed:", err);
        }
      }

      setCameraEnabled(true);
      setCameraError("");
      setIsProcessing(false);

      // initialize recognizer if it has initialize(video, canvas, callback)
      try {
        if (recognizerRef.current && typeof recognizerRef.current.initialize === "function") {
          // call initialize but be defensive
          await Promise.resolve(
            recognizerRef.current.initialize?.(videoRef.current, canvasRef.current, (res: any) => {
              // some recognizers may call back with results — we still prefer our loop, but digest these if present
              try {
                if (!res) return;
                const text = String(res.text || "").trim();
                const confidence = typeof res.confidence === "number" ? res.confidence : 0.6;
                pushDetection({ text, confidence });
              } catch (e) {
                console.warn("Recognizer callback error:", e);
              }
            })
          );
        }
      } catch (initErr) {
        console.warn("Recognizer initialization failed:", initErr);
      }

      // start recognition loop
      startRecognitionLoop();
    } catch (err: any) {
      console.error("enableCamera error:", err);
      let msg = "Unable to access camera. Please check permissions and try again.";
      if (err?.name === "NotAllowedError") msg = "Camera permission denied. Allow camera access and refresh.";
      if (err?.name === "NotFoundError") msg = "No camera device found. Connect a camera or use text input.";
      setCameraError(msg);
      alert(msg);
      setIsProcessing(false);
      setCameraEnabled(false);
    }
  };

  const disableCamera = () => {
    stopEverything();
  };

  const stopEverything = () => {
    stopRecognitionLoop();
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((t) => t.stop());
      } catch (e) {
        console.warn("Error stopping tracks:", e);
      }
      streamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        // detach stream
        videoRef.current.srcObject = null;
      } catch (e) {
        console.warn("Error clearing video element:", e);
      }
    }
    setCameraEnabled(false);
    setCameraError("");
    setDetectedSignText("");
  };

  // capture/submit handler - tries best available detection, otherwise uses typed input
  const handleSignLanguageCapture = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // priority 1: typed text is present
    if (inputText.trim()) {
      const t = inputText.trim();
      setIsProcessing(false);
      try {
        onSignLanguageDetected?.(t);
      } finally {
        setInputText("");
        setDetectedSignText("");
      }
      return;
    }

    // priority 2: if recognizer provides captureFrame API
    const recognizer = recognizerRef.current;
    if (recognizer && typeof recognizer.captureFrame === "function") {
      try {
        const res: any = await recognizer.captureFrame();
        if (res && res.text) {
          acceptDetection(String(res.text));
          setIsProcessing(false);
          return;
        }
      } catch (e) {
        console.warn("captureFrame failed:", e);
      }
    }

    // fallback: ask user to type
    setIsProcessing(false);
    alert("No clear sign detected — please type your message or try signing again more clearly.");
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    onTextInput?.(inputText.trim());
    setInputText("");
  };

  // keyboard enter behaviour: if sign mode and camera on -> capture; else submit typed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputMethod === "type") handleTextSubmit();
      else handleSignLanguageCapture();
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => {
            setInputMethod("type");
            if (cameraEnabled) stopEverything();
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            inputMethod === "type"
              ? "bg-background text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Type
        </button>
        <button
          onClick={async () => {
            setInputMethod("sign");
            if (!cameraEnabled) {
              try {
                await enableCamera();
              } catch (err) {
                console.warn("enableCamera failed:", err);
              }
            }
          }}
          className={`px-4 py-2 font-medium transition-colors ${
            inputMethod === "sign"
              ? "bg-background text-foreground border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign (Sign2Text)
        </button>
      </div>

      {/* Camera area */}
      {inputMethod === "sign" && (
        <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", minHeight: 300 }}>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ display: cameraEnabled && recognitionActive ? "block" : "none" }}
          />
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{
              transform: "scaleX(-1)",
              display: cameraEnabled ? "block" : "none",
            }}
          />
          {!cameraEnabled ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-muted/50 z-10">
              <CameraOff className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Camera is off</p>
              <p className="text-sm text-center px-4 mb-4">
                Enable camera to use Sign2Text or type your message below.
              </p>
              <Button onClick={enableCamera} variant="outline" className="mt-2">
                <Camera className="w-4 h-4 mr-2" />
                Enable Camera
              </Button>
              {cameraError && <p className="text-xs text-destructive mt-2 px-4 text-center max-w-xs">{cameraError}</p>}
            </div>
          ) : (
            <>
              {isProcessing && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                  <div className="text-white text-center">
                    <Loader2 className="animate-spin text-white" size={32} />
                    <p className="font-medium mt-2">Processing sign(s)...</p>
                  </div>
                </div>
              )}
              {!isProcessing && (
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-black/60 text-white px-3 py-2 rounded text-sm">
                    {recognitionActive ? "🎯 Recognition active — sign clearly in front of the camera" : "📹 Camera active — preparing recognition"}
                  </div>
                  {debugInfo && <div className="bg-blue-600/80 text-white px-3 py-2 rounded text-xs font-mono mt-2">{debugInfo}</div>}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Text area */}
      <div className="space-y-2">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={inputMethod === "sign" ? "Type your message or sign in front of the camera..." : "Type your message..."}
          className="w-full min-h-[100px] p-4 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          onKeyDown={handleKeyDown}
        />
        {inputMethod === "sign" && detectedSignText && (
          <div className="p-2 bg-primary/10 border border-primary/20 rounded text-xs">
            <span className="font-medium">Detected from sign language:</span> {detectedSignText}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {inputMethod === "sign" && (
          <Button variant="outline" size="icon" onClick={cameraEnabled ? disableCamera : enableCamera} title={cameraEnabled ? "Disable camera" : "Enable camera"}>
            {cameraEnabled ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
          </Button>
        )}

        <Button
          onClick={inputMethod === "sign" ? handleSignLanguageCapture : handleTextSubmit}
          disabled={isProcessing || (!inputText.trim() && inputMethod === "type")}
          className="flex-1"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {inputMethod === "sign" ? "Processing sign..." : "Sending..."}
            </span>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </div>
  );
}