import { Hands } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

export interface HandLandmarks {
  x: number;
  y: number;
  z: number;
}

export interface SignLanguageResult {
  text: string;
  confidence: number;
  gesture?: string;
}

export class SignLanguageRecognizer {
  private hands: Hands | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private onResultCallback: ((result: SignLanguageResult) => void) | null = null;
  private isProcessing: boolean = false;
  private gestureBuffer: string[] = [];
  private lastGestureTime: number = 0;
  private currentWord: string = '';
  private animationFrameId: number | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.initializeHands();
  }

  private initializeHands() {
    try {
      console.log('Initializing MediaPipe Hands...');
      this.hands = new Hands({
        locateFile: (file) => {
          const url = `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          return url;
        },
      });

      this.hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      this.hands.onResults((results) => {
        this.processHandResults(results);
      });

      console.log('MediaPipe Hands initialized successfully');
    } catch (error) {
      console.error('Error initializing MediaPipe Hands:', error);
      throw error;
    }
  }

  public initialize(
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    onResult: (result: SignLanguageResult) => void
  ) {
    try {
      console.log('Initializing sign language recognizer...');

      this.videoElement = videoElement;
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext('2d');
      this.onResultCallback = onResult;

      if (!this.canvas || !this.ctx) {
        throw new Error('Canvas element or context not available');
      }

      if (!this.hands) {
        throw new Error('MediaPipe Hands not initialized');
      }

      // Set canvas size to match video
      const updateCanvasSize = () => {
        if (this.canvas && this.videoElement) {
          const width = this.videoElement.videoWidth || 640;
          const height = this.videoElement.videoHeight || 480;
          this.canvas.width = width;
          this.canvas.height = height;
        }
      };

      if (videoElement.readyState >= 2) {
        updateCanvasSize();
      } else {
        videoElement.addEventListener('loadedmetadata', updateCanvasSize, { once: true });
      }

      this.isInitialized = true;
      this.processFrame();
    } catch (error) {
      console.error('Error in recognizer initialization:', error);
      throw error;
    }
  }

  private processFrame = async () => {
    if (!this.isInitialized || !this.hands || !this.videoElement || !this.canvas) {
      this.animationFrameId = requestAnimationFrame(this.processFrame);
      return;
    }

    if (this.videoElement.readyState < 2 || this.videoElement.videoWidth === 0) {
      this.animationFrameId = requestAnimationFrame(this.processFrame);
      return;
    }

    try {
      await this.hands.send({ image: this.videoElement });
    } catch (error) {
      console.error('Error processing frame:', error);
    }

    this.animationFrameId = requestAnimationFrame(this.processFrame);
  };

  private processHandResults(results: any) {
    if (!this.canvas || !this.ctx || !this.videoElement) {
      return;
    }

    try {
      if (this.canvas.width !== this.videoElement.videoWidth || 
          this.canvas.height !== this.videoElement.videoHeight) {
        this.canvas.width = this.videoElement.videoWidth;
        this.canvas.height = this.videoElement.videoHeight;
      }
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        this.ctx.save();
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        
        for (const landmarks of results.multiHandLandmarks) {
          if (landmarks && landmarks.length >= 21) {
            try {
              drawConnectors(this.ctx, landmarks, HAND_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 2,
              });
              drawLandmarks(this.ctx, landmarks, {
                color: '#FF0000',
                lineWidth: 1,
                radius: 3,
              });
            } catch (drawError) {
              console.error('Error drawing landmarks:', drawError);
            }
          }
        }

        this.ctx.restore();

        if (results.multiHandLandmarks[0] && results.multiHandLandmarks[0].length >= 21) {
          const gesture = this.recognizeGesture(results.multiHandLandmarks[0]);
          if (gesture) {
            this.handleGesture(gesture);
          }
        }
      }
    } catch (error) {
      console.error('Error processing hand results:', error);
    }
  }

  private recognizeGesture(landmarks: HandLandmarks[]): string | null {
    if (landmarks.length < 21) return null;

    const palmWidth = this.getDistance(landmarks[5], landmarks[17]);
    const THRESH_NEAR = palmWidth * 0.9;
    const THRESH_CLOSE = palmWidth * 0.7;
    const THRESH_TOUCH = palmWidth * 0.5;

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];

    const isThumbExtended = this.isFingerExtended(thumbTip, thumbIP, thumbMCP, wrist, true);
    const isIndexExtended = this.isFingerExtended(indexTip, indexPIP, indexMCP, wrist, false);
    const isMiddleExtended = this.isFingerExtended(middleTip, middlePIP, middleMCP, wrist, false);
    const isRingExtended = this.isFingerExtended(ringTip, ringPIP, landmarks[13], wrist, false);
    const isPinkyExtended = this.isFingerExtended(pinkyTip, pinkyPIP, landmarks[17], wrist, false);

    const extendedCount = [isThumbExtended, isIndexExtended, isMiddleExtended, isRingExtended, isPinkyExtended]
      .filter(Boolean).length;

    const thumbUp = thumbTip.y < thumbIP.y;

    // HELLO: Open hand
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended) {
      return 'HELLO';
    }

    // YES: Thumb up
    if (isThumbExtended && thumbUp && !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return 'YES';
    }

    // THANK YOU: Open hand without thumb near face
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
      if (wrist.y < 0.5) {
        return 'THANKYOU';
      }
    }

    // O: Circle with thumb and index
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const thumbIndexDistance = this.getDistance(thumbTip, indexTip);
      if (thumbIndexDistance < THRESH_CLOSE && thumbIndexDistance > THRESH_TOUCH * 0.5 && isThumbExtended) {
        return 'O';
      }
    }

    // V: Peace sign
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      const fingersApart = Math.abs(indexTip.x - middleTip.x) > THRESH_TOUCH;
      if (fingersApart) {
        return 'V';
      }
    }

    // A: Fist
    if (extendedCount === 0 || (isThumbExtended && extendedCount === 1)) {
      return 'A';
    }

    // B: All four fingers extended
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
      return 'B';
    }

    // D: Index finger extended
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return 'D';
    }

    // I: Pinky extended
    if (isPinkyExtended && !isIndexExtended && !isMiddleExtended && !isRingExtended && !isThumbExtended) {
      return 'I';
    }

    // L: Index and thumb extended
    if (isIndexExtended && isThumbExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const thumbIndexDistance = this.getDistance(thumbTip, indexTip);
      if (thumbIndexDistance > THRESH_CLOSE) {
        return 'L';
      }
    }

    // Y: Thumb and pinky extended
    if (isThumbExtended && isPinkyExtended && !isIndexExtended && !isMiddleExtended && !isRingExtended) {
      return 'Y';
    }

    return null;
  }

  private isFingerExtended(
    tip: HandLandmarks, 
    pip: HandLandmarks, 
    mcp: HandLandmarks, 
    wrist: HandLandmarks,
    isThumb: boolean
  ): boolean {
    if (isThumb) {
      const thumbExtension = this.getDistance(tip, pip);
      const thumbBase = this.getDistance(pip, mcp);
      return thumbExtension > thumbBase * 0.6;
    }

    const tipToWrist = this.getDistance(tip, wrist);
    const pipToWrist = this.getDistance(pip, wrist);
    const tipToPip = this.getDistance(tip, pip);
    const pipToMcp = this.getDistance(pip, mcp);
    
    const extendedUp = tip.y < pip.y + 0.02;
    const extendedOut = tipToWrist > pipToWrist * 1.05;
    const sufficientExtension = tipToPip > pipToMcp * 0.4;
    
    const criteriaMet = [extendedUp, extendedOut, sufficientExtension].filter(Boolean).length;
    return criteriaMet >= 2;
  }

  private getDistance(point1: HandLandmarks, point2: HandLandmarks): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    const dz = point1.z - point2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private handleGesture(gesture: string) {
    const now = Date.now();
    
    this.gestureBuffer.push(gesture);
    if (this.gestureBuffer.length > 60) {
      this.gestureBuffer = this.gestureBuffer.slice(-60);
    }

    const recentGestures = this.gestureBuffer.slice(-15);
    const gestureCount = recentGestures.filter(g => g === gesture).length;
    const isStable = gestureCount >= 6;
    
    if (isStable && (now - this.lastGestureTime > 800 || this.lastGestureTime === 0)) {
      this.lastGestureTime = now;
      
      if (gesture.length === 1) {
        if (this.currentWord === '' || this.currentWord[this.currentWord.length - 1] !== gesture) {
          this.currentWord += gesture;
          
          if (this.onResultCallback && this.currentWord.length > 0) {
            this.onResultCallback({
              text: this.currentWord,
              confidence: 0.6,
              gesture: gesture,
            });
          }
        }
      } else {
        if (this.onResultCallback) {
          this.onResultCallback({
            text: gesture.toLowerCase(),
            confidence: 0.85,
            gesture: gesture,
          });
        }
        this.currentWord = '';
      }
    }

    if (this.currentWord.length > 0 && now - this.lastGestureTime > 1500) {
      const recognizedText = this.recognizeWord(this.currentWord);
      if (recognizedText && this.onResultCallback) {
        this.onResultCallback({
          text: recognizedText,
          confidence: 0.75,
          gesture: this.currentWord,
        });
      }
      this.currentWord = '';
    }
  }

  private recognizeWord(letters: string): string | null {
    const commonWords: { [key: string]: string } = {
      'HELLO': 'hello', 'HI': 'hi', 'YES': 'yes', 'NO': 'no',
      'THANKYOU': 'thank you', 'THANK': 'thank you', 'PLEASE': 'please',
      'HELP': 'help', 'ILOVEYOU': 'i love you', 'ILU': 'i love you',
      'NAME': 'name', 'WHAT': 'what', 'HOW': 'how', 'WHERE': 'where',
      'WHY': 'why', 'WHEN': 'when', 'WHO': 'who', 'SORRY': 'sorry',
      'GOOD': 'good', 'BAD': 'bad', 'OK': 'okay', 'FINE': 'fine',
      'EAT': 'eat', 'DRINK': 'drink', 'SLEEP': 'sleep',
      'HOME': 'home', 'SCHOOL': 'school', 'FRIEND': 'friend', 'FAMILY': 'family',
    };
    
    const upperLetters = letters.toUpperCase();
    if (commonWords[upperLetters]) {
      return commonWords[upperLetters];
    }
    
    return letters.length > 0 ? letters.toLowerCase().split('').join(' ') : null;
  }

  public async captureFrame(): Promise<SignLanguageResult | null> {
    if (!this.videoElement || !this.hands) {
      return null;
    }

    if (this.videoElement.readyState < 2) {
      return {
        text: this.currentWord || '',
        confidence: 0.3,
      };
    }

    if (this.currentWord.length > 0) {
      const recognizedText = this.recognizeWord(this.currentWord) || this.currentWord;
      return {
        text: recognizedText,
        confidence: 0.75,
        gesture: this.currentWord,
      };
    }

    return {
      text: 'Sign in front of the camera',
      confidence: 0.5,
    };
  }

  public stop() {
    this.isInitialized = false;
    
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    if (this.hands) {
      this.hands.close();
      this.hands = null;
    }

    this.gestureBuffer = [];
    this.currentWord = '';
    this.isProcessing = false;
    this.videoElement = null;
    this.canvas = null;
    this.ctx = null;
  }

  public isRecognizing(): boolean {
    return this.isProcessing;
  }
}