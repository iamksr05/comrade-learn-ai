import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RefreshCw, Volume2, FileText, Video } from "lucide-react";

interface SignLanguageOutputProps {
  transcript: string;
  simplifiedSummary: string;
  videoUrl?: string;
}

export function SignLanguageOutput({ transcript, simplifiedSummary, videoUrl }: SignLanguageOutputProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTextOnly, setShowTextOnly] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  // For demo purposes, we'll use a placeholder video
  // In production, this would be generated from the AI response via text-to-ASL service
  const defaultVideoUrl = videoUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Animated ASL visualization when no video is available
  useEffect(() => {
    if (!videoUrl && !showTextOnly) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [videoUrl, showTextOnly]);

  // Simulate ASL video - In production, this would be generated from text-to-ASL
  // For now, we'll show a placeholder that represents an ASL interpreter
  return (
    <div className="space-y-6">
      {/* Toggle View Buttons */}
      <div className="flex gap-2 justify-end">
        <Button
          variant={!showTextOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowTextOnly(false)}
          className="flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          Sign Language
        </Button>
        <Button
          variant={showTextOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowTextOnly(true)}
          className="flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Text Only
        </Button>
      </div>

      {!showTextOnly ? (
        /* Sign Language Video Section */
        <Card className="border-2 border-primary/20">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", minHeight: "400px" }}>
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-contain"
                  playsInline
                />
              ) : (
                // Animated ASL interpreter placeholder
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="relative w-40 h-40 mx-auto mb-6">
                      {/* Animated ASL hands simulation */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Left hand */}
                          <div 
                            className="absolute -left-20 top-0 text-6xl transition-transform duration-1000"
                            style={{
                              transform: `rotate(${animationStep * 15}deg) translateY(${Math.sin(animationStep) * 10}px)`,
                            }}
                          >
                            👋
                          </div>
                          {/* Right hand */}
                          <div 
                            className="absolute -right-20 top-0 text-6xl transition-transform duration-1000"
                            style={{
                              transform: `rotate(${-animationStep * 15}deg) translateY(${Math.sin(animationStep + Math.PI) * 10}px)`,
                            }}
                          >
                            🤲
                          </div>
                          {/* Center face */}
                          <div className="text-5xl">😊</div>
                        </div>
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">🤟 American Sign Language (ASL)</h3>
                    <p className="text-base text-white/80 mb-2">
                      AI Response in Sign Language
                    </p>
                    <p className="text-sm text-white/60 mb-4">
                      The response below is shown in text format. In production, this would be a real-time ASL video translation.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                      <Video className="w-4 h-4" />
                      <span className="text-sm">ASL Video (Simulated)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Controls Overlay */}
              {videoUrl && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    {/* Progress Bar */}
                    <div
                      className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer relative"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>

                    <span className="text-white text-sm min-w-[80px] text-right">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={restart}
                      className="text-white hover:bg-white/20"
                      title="Restart"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Text Response Section - Always visible */}
      <div className="space-y-4">
        <Card className="border-2 border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">📝 Full Text Response</h3>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap text-base">
                {transcript}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Simplified Summary */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="text-lg font-semibold">Quick Summary</h3>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-foreground leading-relaxed text-base">
                {simplifiedSummary}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>ℹ️ Note:</strong> This response is displayed in both sign language format (above) and text format (below). 
          In a production environment, the sign language video would be generated in real-time from the text using advanced text-to-ASL translation technology.
        </p>
      </div>
    </div>
  );
}

