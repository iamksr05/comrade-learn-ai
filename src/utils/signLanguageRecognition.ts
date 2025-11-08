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
          console.log('Loading MediaPipe file:', url);
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
      console.log('Initializing sign language recognizer...', {
        video: !!videoElement,
        canvas: !!canvasElement,
        videoReady: videoElement.readyState,
        videoWidth: videoElement.videoWidth,
        videoHeight: videoElement.videoHeight,
      });

      this.videoElement = videoElement;
      this.canvas = canvasElement;
      this.ctx = canvasElement.getContext('2d');
      this.onResultCallback = onResult;

      if (!this.canvas) {
        throw new Error('Canvas element not available');
      }

      if (!this.ctx) {
        throw new Error('Canvas context not available');
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
          console.log('Canvas size updated:', { width, height });
        }
      };

      // Update canvas size when video metadata loads
      if (videoElement.readyState >= 2) {
        updateCanvasSize();
      } else {
        videoElement.addEventListener('loadedmetadata', updateCanvasSize, { once: true });
        videoElement.addEventListener('loadeddata', updateCanvasSize, { once: true });
      }

      // Also update on resize
      videoElement.addEventListener('resize', updateCanvasSize);

      // Start processing frames
      this.isInitialized = true;
      console.log('Starting frame processing...');
      this.processFrame();
    } catch (error) {
      console.error('Error in recognizer initialization:', error);
      throw error;
    }
  }

  private processFrame = async () => {
    if (!this.isInitialized || !this.hands || !this.videoElement || !this.canvas) {
      console.warn('Frame processing skipped:', {
        isInitialized: this.isInitialized,
        hasHands: !!this.hands,
        hasVideo: !!this.videoElement,
        hasCanvas: !!this.canvas,
      });
      return;
    }

    // Check if video is ready
    if (this.videoElement.readyState < 2) {
      // Video not ready yet, try again on next frame
      this.animationFrameId = requestAnimationFrame(this.processFrame);
      return;
    }

    // Check if video has valid dimensions
    if (this.videoElement.videoWidth === 0 || this.videoElement.videoHeight === 0) {
      // Video dimensions not available yet
      this.animationFrameId = requestAnimationFrame(this.processFrame);
      return;
    }

    try {
      // Process current video frame
      await this.hands.send({ image: this.videoElement });
    } catch (error) {
      console.error('Error processing frame with MediaPipe:', error);
      // Don't stop processing on error, just log it
    }

    // Continue processing
    this.animationFrameId = requestAnimationFrame(this.processFrame);
  };

  private processHandResults(results: any) {
    if (!this.canvas || !this.ctx || !this.videoElement) {
      console.warn('Cannot process hand results - missing elements');
      return;
    }

    try {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Check if hands are detected
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Update canvas size if needed
        if (this.canvas.width !== this.videoElement.videoWidth || 
            this.canvas.height !== this.videoElement.videoHeight) {
          this.canvas.width = this.videoElement.videoWidth;
          this.canvas.height = this.videoElement.videoHeight;
        }

        this.ctx.save();
        
        // Flip canvas horizontally for mirror effect (to match video)
        this.ctx.scale(-1, 1);
        this.ctx.translate(-this.canvas.width, 0);
        
        // Draw hand landmarks and connections
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

        // Recognize gesture from first hand
        if (results.multiHandLandmarks[0] && results.multiHandLandmarks[0].length >= 21) {
          const gesture = this.recognizeGesture(results.multiHandLandmarks[0]);
          if (gesture) {
            console.log('Gesture recognized:', gesture);
            this.handleGesture(gesture);
          }
        }
      } else {
        // No hands detected - clear any previous gesture
        // Don't clear the word buffer, just log
        if (this.gestureBuffer.length > 0) {
          // Only log occasionally to avoid spam
          if (Math.random() < 0.01) {
            console.log('No hands detected in frame');
          }
        }
      }
    } catch (error) {
      console.error('Error processing hand results:', error);
    }
  }

  private recognizeGesture(landmarks: HandLandmarks[]): string | null {
    if (landmarks.length < 21) return null;

    const wrist = landmarks[0];
    
    // Get key finger points
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
    const ringMCP = landmarks[13];
    
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];

    // Improved finger extension detection
    const isThumbExtended = this.isFingerExtended(thumbTip, thumbIP, thumbMCP, wrist, true);
    const isIndexExtended = this.isFingerExtended(indexTip, indexPIP, indexMCP, wrist, false);
    const isMiddleExtended = this.isFingerExtended(middleTip, middlePIP, middleMCP, wrist, false);
    const isRingExtended = this.isFingerExtended(ringTip, ringPIP, ringMCP, wrist, false);
    const isPinkyExtended = this.isFingerExtended(pinkyTip, pinkyPIP, pinkyMCP, wrist, false);

    // Count extended fingers
    const extendedCount = [isThumbExtended, isIndexExtended, isMiddleExtended, isRingExtended, isPinkyExtended]
      .filter(Boolean).length;

    // Get finger positions for spatial analysis
    const thumbUp = thumbTip.y < thumbIP.y;
    const thumbDown = thumbTip.y > thumbIP.y;
    const thumbRight = thumbTip.x > thumbIP.x;
    const thumbLeft = thumbTip.x < thumbIP.x;

    // Check specific gestures first (more specific before general)
    // Order matters - check more specific gestures first
    
    // Common word gestures (check first as they're most distinctive)
    // YES: Thumb up (thumb extended upward, all other fingers closed)
    if (isThumbExtended && thumbUp && !isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return 'YES';
    }

    // HELLO: Open hand (all fingers extended)
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended) {
      return 'HELLO';
    }

    // THANK YOU: Open hand without thumb (B handshape near face)
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
      const handNearFace = wrist.y < 0.5;
      if (handNearFace) {
        return 'THANKYOU';
      }
    }

    // Now check letters - specific ones first
    
    // O: Thumb and index finger form a circle (very specific)
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const thumbIndexDistance = this.getDistance(thumbTip, indexTip);
      const thumbIndexClose = thumbIndexDistance < 0.06 && thumbIndexDistance > 0.02;
      if (thumbIndexClose && isThumbExtended) {
        return 'O';
      }
    }

    // T: Thumb between index and middle fingers (specific)
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const thumbBetween = thumbTip.x > Math.min(indexTip.x, middleTip.x) && 
                           thumbTip.x < Math.max(indexTip.x, middleTip.x);
      if (thumbBetween) {
        return 'T';
      }
    }

    // S: Fist with thumb across fingers
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const thumbAcross = thumbTip.x < indexTip.x || this.getDistance(thumbTip, indexTip) < 0.08;
      if (thumbAcross) {
        return 'S';
      }
    }

    // X: Index finger bent (specific bent gesture)
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      const indexBent = indexTip.y > indexPIP.y;
      if (indexBent) {
        return 'X';
      }
    }

    // A: Fist (all fingers closed, thumb can be in any position) - check last as it's most general
    if (extendedCount === 0 || (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended)) {
      return 'A';
    }

    // B: All four fingers extended, thumb tucked in
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
      return 'B';
    }

    // C: Curved hand (fingers curved, not fully extended)
    const fingersCurved = isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended;
    const thumbCurved = thumbTip.x > indexTip.x - 0.1;
    if (fingersCurved && thumbCurved && this.getDistance(thumbTip, indexTip) > 0.08) {
      return 'C';
    }

    // D: Only index finger extended, thumb touches middle finger
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const thumbNearMiddle = this.getDistance(thumbTip, middleTip) < 0.08;
      if (thumbNearMiddle || !isThumbExtended) {
        return 'D';
      }
    }

    // E: All fingers bent, touching thumb
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const thumbNearFingers = this.getDistance(thumbTip, indexTip) < 0.1;
      if (thumbNearFingers) {
        return 'E';
      }
    }

    // F: Index and thumb form "OK" sign, other fingers extended
    if (isMiddleExtended && isRingExtended && isPinkyExtended && !isIndexExtended) {
      const thumbIndexClose = this.getDistance(thumbTip, indexTip) < 0.06;
      if (thumbIndexClose) {
        return 'F';
      }
    }

    // G: Index finger pointing, thumb tucked
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      // Check if index is pointing (extended significantly)
      const indexExtension = this.getDistance(indexTip, indexPIP);
      if (indexExtension > 0.05) {
        return 'G';
      }
    }

    // H: Index and middle fingers extended together, others closed
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const fingersTogether = Math.abs(indexTip.x - middleTip.x) < 0.05;
      if (fingersTogether && !isThumbExtended) {
        return 'H';
      }
    }

    // I: Only pinky extended
    if (isPinkyExtended && !isIndexExtended && !isMiddleExtended && !isRingExtended && !isThumbExtended) {
      return 'I';
    }

    // K: Index and middle fingers extended, forming V, thumb between them
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const fingersApart = Math.abs(indexTip.x - middleTip.x) > 0.05;
      if (fingersApart && isThumbExtended) {
        const thumbBetween = (thumbTip.x > Math.min(indexTip.x, middleTip.x) && 
                              thumbTip.x < Math.max(indexTip.x, middleTip.x));
        if (thumbBetween) {
          return 'K';
        }
      }
    }

    // L: Index finger and thumb extended, forming L shape
    if (isIndexExtended && isThumbExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      // Check if they form an L (perpendicular)
      const thumbIndexDistance = this.getDistance(thumbTip, indexTip);
      if (thumbIndexDistance > 0.06) {
        return 'L';
      }
    }

    // M: Three fingers (index, middle, ring) down, thumb tucked
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended && !isThumbExtended) {
      return 'M';
    }

    // N: Index and middle fingers down, ring and pinky down, thumb tucked
    // Note: N is very similar to A, so we prioritize A unless there's a clear distinction
    // For now, N detection is disabled as it's too similar to A
    // if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
    //   const allTipsClose = this.getDistance(indexTip, middleTip) < 0.05 &&
    //                        this.getDistance(middleTip, ringTip) < 0.05;
    //   if (allTipsClose) {
    //     return 'N';
    //   }
    // }

    // O is already checked earlier, skip duplicate

    // P: Index and middle fingers down, thumb extended out
    if (!isIndexExtended && !isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended) {
      return 'P';
    }

    // Q: Index finger pointing down, thumb extended (similar to G but pointing down)
    // Check after other thumb-extended gestures
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const indexPointingDown = indexTip.y > indexPIP.y + 0.02;
      // Make sure it's not T, S, or O
      const notT = !(thumbTip.x > Math.min(indexTip.x, middleTip.x) && thumbTip.x < Math.max(indexTip.x, middleTip.x));
      const notO = this.getDistance(thumbTip, indexTip) >= 0.06;
      const notS = thumbTip.x >= indexTip.x && this.getDistance(thumbTip, indexTip) >= 0.08;
      if (indexPointingDown && notT && notO && notS) {
        return 'Q';
      }
    }

    // R: Index and middle fingers crossed
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const fingersCrossed = Math.abs(indexTip.x - middleTip.x) < 0.03 && 
                             Math.abs(indexTip.y - middleTip.y) < 0.03;
      if (fingersCrossed && isThumbExtended) {
        return 'R';
      }
    }

    // S: Fist with thumb across fingers
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      if (isThumbExtended) {
        const thumbAcross = thumbTip.x < indexTip.x || this.getDistance(thumbTip, indexTip) < 0.08;
        if (thumbAcross) {
          return 'S';
        }
      }
    }

    // T: Thumb between index and middle fingers
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const thumbBetween = thumbTip.x > Math.min(indexTip.x, middleTip.x) && 
                           thumbTip.x < Math.max(indexTip.x, middleTip.x);
      if (thumbBetween) {
        return 'T';
      }
    }

    // U: Index and middle fingers extended together up
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      const fingersTogether = Math.abs(indexTip.x - middleTip.x) < 0.04;
      const pointingUp = indexTip.y < indexPIP.y && middleTip.y < middlePIP.y;
      if (fingersTogether && pointingUp) {
        return 'U';
      }
    }

    // V: Index and middle fingers extended apart (peace sign)
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      const fingersApart = Math.abs(indexTip.x - middleTip.x) > 0.05;
      if (fingersApart) {
        return 'V';
      }
    }

    // W: Index, middle, and ring fingers extended
    if (isIndexExtended && isMiddleExtended && isRingExtended && !isPinkyExtended && isThumbExtended) {
      return 'W';
    }

    // X: Index finger bent
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      const indexBent = indexTip.y > indexPIP.y;
      if (indexBent && !isThumbExtended) {
        return 'X';
      }
    }

    // Y: Thumb and pinky extended
    if (isThumbExtended && isPinkyExtended && !isIndexExtended && !isMiddleExtended && !isRingExtended) {
      return 'Y';
    }

    // Z: Index finger drawing Z shape (requires movement, simplified to index pointing)
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && isThumbExtended) {
      const indexPointing = this.getDistance(indexTip, indexPIP) > 0.06;
      if (indexPointing) {
        return 'Z';
      }
    }

    // If no gesture matched, return null
    return null;
  }

  private isFingerExtended(
    tip: HandLandmarks, 
    pip: HandLandmarks, 
    mcp: HandLandmarks, 
    wrist: HandLandmarks,
    isThumb: boolean
  ): boolean {
    // For thumb, use different logic
    if (isThumb) {
      // Thumb is extended if tip is significantly away from IP joint
      const thumbExtension = this.getDistance(tip, pip);
      const thumbBase = this.getDistance(pip, mcp);
      // More lenient threshold for thumb
      return thumbExtension > thumbBase * 0.6;
    }

    // For other fingers, check if tip is above PIP joint (extended upward)
    // Also check distance from wrist
    const tipToWrist = this.getDistance(tip, wrist);
    const pipToWrist = this.getDistance(pip, wrist);
    const tipToPip = this.getDistance(tip, pip);
    const pipToMcp = this.getDistance(pip, mcp);
    
    // Finger is extended if:
    // 1. Tip is farther from wrist than PIP (primary indicator)
    // 2. Tip is above PIP (y coordinate check) - more lenient
    // 3. Tip is sufficiently far from PIP (relative to finger segment length)
    const extendedUp = tip.y < pip.y + 0.02; // Tip above or slightly below PIP (more lenient)
    const extendedOut = tipToWrist > pipToWrist * 1.05; // Tip farther from wrist (more lenient)
    const sufficientExtension = tipToPip > pipToMcp * 0.4; // Relative to finger segment length
    
    // Finger is extended if it meets at least 2 out of 3 criteria
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
    
    // Add gesture to buffer
    this.gestureBuffer.push(gesture);
    
    // Keep only recent gestures (last 2 seconds, ~60 frames at 30fps)
    if (this.gestureBuffer.length > 60) {
      this.gestureBuffer = this.gestureBuffer.slice(-60);
    }

    // Check if gesture is stable (appears consistently)
    const recentGestures = this.gestureBuffer.slice(-15); // Last 15 frames (~0.5 seconds)
    const gestureCount = recentGestures.filter(g => g === gesture).length;
    const isStable = gestureCount >= 6; // Gesture appears consistently
    
    // Debug: Log gesture detection
    if (gestureCount >= 3) {
      console.log(`Gesture "${gesture}" detected ${gestureCount} times in recent frames`);
    }
    
    // If gesture is stable and enough time has passed since last recognition
    if (isStable && (now - this.lastGestureTime > 800 || this.lastGestureTime === 0)) {
      this.lastGestureTime = now;
      
      // Handle word formation
      if (gesture.length === 1) {
        // Single letter - add to current word if different from last letter
        if (this.currentWord === '' || this.currentWord[this.currentWord.length - 1] !== gesture) {
          this.currentWord += gesture;
          
          // Show current word being built
          if (this.onResultCallback && this.currentWord.length > 0) {
            this.onResultCallback({
              text: this.currentWord,
              confidence: 0.6,
              gesture: gesture,
            });
          }
        }
      } else {
        // Word gesture - send immediately
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

    // Auto-complete word after 1.5 seconds of no new letters
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
    // Common ASL words and phrases
    const commonWords: { [key: string]: string } = {
      'HELLO': 'hello',
      'HI': 'hi',
      'YES': 'yes',
      'NO': 'no',
      'THANKYOU': 'thank you',
      'THANK': 'thank you',
      'PLEASE': 'please',
      'HELP': 'help',
      'ILOVEYOU': 'i love you',
      'ILU': 'i love you',
      'NAME': 'name',
      'WHAT': 'what',
      'HOW': 'how',
      'WHERE': 'where',
      'WHY': 'why',
      'WHEN': 'when',
      'WHO': 'who',
      'SORRY': 'sorry',
      'EXCUSE': 'excuse me',
      'NICE': 'nice',
      'MEET': 'nice to meet you',
      'GOOD': 'good',
      'BAD': 'bad',
      'YES': 'yes',
      'NO': 'no',
      'OK': 'okay',
      'FINE': 'fine',
      'SICK': 'sick',
      'HAPPY': 'happy',
      'SAD': 'sad',
      'ANGRY': 'angry',
      'TIRED': 'tired',
      'HUNGRY': 'hungry',
      'THIRSTY': 'thirsty',
      'EAT': 'eat',
      'DRINK': 'drink',
      'SLEEP': 'sleep',
      'WORK': 'work',
      'HOME': 'home',
      'SCHOOL': 'school',
      'FRIEND': 'friend',
      'FAMILY': 'family',
      'MOTHER': 'mother',
      'FATHER': 'father',
      'BROTHER': 'brother',
      'SISTER': 'sister',
      'BABY': 'baby',
      'CHILD': 'child',
      'PERSON': 'person',
      'MAN': 'man',
      'WOMAN': 'woman',
      'BOY': 'boy',
      'GIRL': 'girl',
      'DOG': 'dog',
      'CAT': 'cat',
      'BIRD': 'bird',
      'FISH': 'fish',
      'CAR': 'car',
      'BUS': 'bus',
      'TRAIN': 'train',
      'PLANE': 'airplane',
      'HOUSE': 'house',
      'ROOM': 'room',
      'DOOR': 'door',
      'WINDOW': 'window',
      'TABLE': 'table',
      'CHAIR': 'chair',
      'BED': 'bed',
      'BATHROOM': 'bathroom',
      'KITCHEN': 'kitchen',
      'FOOD': 'food',
      'WATER': 'water',
      'MILK': 'milk',
      'BREAD': 'bread',
      'MEAT': 'meat',
      'FRUIT': 'fruit',
      'VEGETABLE': 'vegetable',
      'APPLE': 'apple',
      'ORANGE': 'orange',
      'BANANA': 'banana',
      'CAKE': 'cake',
      'COOKIE': 'cookie',
      'CANDY': 'candy',
      'ICE': 'ice cream',
      'PIZZA': 'pizza',
      'HAMBURGER': 'hamburger',
      'HOTDOG': 'hot dog',
      'SANDWICH': 'sandwich',
      'SOUP': 'soup',
      'SALAD': 'salad',
      'EGG': 'egg',
      'CHEESE': 'cheese',
      'BUTTER': 'butter',
      'SALT': 'salt',
      'PEPPER': 'pepper',
      'SUGAR': 'sugar',
      'COFFEE': 'coffee',
      'TEA': 'tea',
      'JUICE': 'juice',
      'BEER': 'beer',
      'WINE': 'wine',
      'COLOR': 'color',
      'RED': 'red',
      'BLUE': 'blue',
      'GREEN': 'green',
      'YELLOW': 'yellow',
      'ORANGE': 'orange',
      'PURPLE': 'purple',
      'PINK': 'pink',
      'BLACK': 'black',
      'WHITE': 'white',
      'BROWN': 'brown',
      'GRAY': 'gray',
      'GOLD': 'gold',
      'SILVER': 'silver',
      'NUMBER': 'number',
      'ZERO': 'zero',
      'ONE': 'one',
      'TWO': 'two',
      'THREE': 'three',
      'FOUR': 'four',
      'FIVE': 'five',
      'SIX': 'six',
      'SEVEN': 'seven',
      'EIGHT': 'eight',
      'NINE': 'nine',
      'TEN': 'ten',
      'ELEVEN': 'eleven',
      'TWELVE': 'twelve',
      'THIRTEEN': 'thirteen',
      'FOURTEEN': 'fourteen',
      'FIFTEEN': 'fifteen',
      'SIXTEEN': 'sixteen',
      'SEVENTEEN': 'seventeen',
      'EIGHTEEN': 'eighteen',
      'NINETEEN': 'nineteen',
      'TWENTY': 'twenty',
      'THIRTY': 'thirty',
      'FORTY': 'forty',
      'FIFTY': 'fifty',
      'SIXTY': 'sixty',
      'SEVENTY': 'seventy',
      'EIGHTY': 'eighty',
      'NINETY': 'ninety',
      'HUNDRED': 'hundred',
      'THOUSAND': 'thousand',
      'MILLION': 'million',
      'BILLION': 'billion',
      'TIME': 'time',
      'HOUR': 'hour',
      'MINUTE': 'minute',
      'SECOND': 'second',
      'DAY': 'day',
      'NIGHT': 'night',
      'MORNING': 'morning',
      'AFTERNOON': 'afternoon',
      'EVENING': 'evening',
      'TODAY': 'today',
      'YESTERDAY': 'yesterday',
      'TOMORROW': 'tomorrow',
      'NOW': 'now',
      'LATER': 'later',
      'SOON': 'soon',
      'ALWAYS': 'always',
      'NEVER': 'never',
      'SOMETIMES': 'sometimes',
      'OFTEN': 'often',
      'USUALLY': 'usually',
      'SELDOM': 'seldom',
      'RARELY': 'rarely',
      'AGAIN': 'again',
      'ALSO': 'also',
      'AND': 'and',
      'OR': 'or',
      'BUT': 'but',
      'BECAUSE': 'because',
      'IF': 'if',
      'THEN': 'then',
      'ELSE': 'else',
      'WHILE': 'while',
      'UNTIL': 'until',
      'BEFORE': 'before',
      'AFTER': 'after',
      'DURING': 'during',
      'SINCE': 'since',
      'FOR': 'for',
      'WITH': 'with',
      'WITHOUT': 'without',
      'FROM': 'from',
      'TO': 'to',
      'IN': 'in',
      'ON': 'on',
      'AT': 'at',
      'BY': 'by',
      'OF': 'of',
      'FOR': 'for',
      'ABOUT': 'about',
      'AGAINST': 'against',
      'AMONG': 'among',
      'AROUND': 'around',
      'AS': 'as',
      'BEFORE': 'before',
      'BEHIND': 'behind',
      'BELOW': 'below',
      'BENEATH': 'beneath',
      'BESIDE': 'beside',
      'BETWEEN': 'between',
      'BEYOND': 'beyond',
      'BUT': 'but',
      'BY': 'by',
      'CONCERNING': 'concerning',
      'CONSIDERING': 'considering',
      'DESPITE': 'despite',
      'DOWN': 'down',
      'DURING': 'during',
      'EXCEPT': 'except',
      'EXCEPTING': 'excepting',
      'EXCLUDING': 'excluding',
      'FOLLOWING': 'following',
      'FOR': 'for',
      'FROM': 'from',
      'IN': 'in',
      'INSIDE': 'inside',
      'INTO': 'into',
      'LIKE': 'like',
      'MINUS': 'minus',
      'NEAR': 'near',
      'NEXT': 'next',
      'OF': 'of',
      'OFF': 'off',
      'ON': 'on',
      'ONTO': 'onto',
      'OPPOSITE': 'opposite',
      'OUT': 'out',
      'OUTSIDE': 'outside',
      'OVER': 'over',
      'PAST': 'past',
      'PER': 'per',
      'PLUS': 'plus',
      'REGARDING': 'regarding',
      'ROUND': 'round',
      'SAVE': 'save',
      'SINCE': 'since',
      'THAN': 'than',
      'THROUGH': 'through',
      'TO': 'to',
      'TOWARD': 'toward',
      'TOWARDS': 'towards',
      'UNDER': 'under',
      'UNDERNEATH': 'underneath',
      'UNLIKE': 'unlike',
      'UNTIL': 'until',
      'UP': 'up',
      'UPON': 'upon',
      'VERSUS': 'versus',
      'VIA': 'via',
      'WITH': 'with',
      'WITHIN': 'within',
      'WITHOUT': 'without',
      'WORTH': 'worth',
    };

    // Check for exact matches (case insensitive)
    const upperLetters = letters.toUpperCase();
    if (commonWords[upperLetters]) {
      return commonWords[upperLetters];
    }

    // Try partial matches for common words
    const commonPatterns: { [key: string]: string } = {
      'HI': 'hi',
      'HE': 'hello',
      'HEL': 'hello',
      'HELL': 'hello',
      'TH': 'thank you',
      'THA': 'thank you',
      'THAN': 'thank you',
      'THANK': 'thank you',
      'PL': 'please',
      'PLE': 'please',
      'PLEA': 'please',
      'PLEAS': 'please',
      'HE': 'help',
      'HEL': 'help',
      'YE': 'yes',
      'NO': 'no',
      'OK': 'okay',
      'IL': 'i love you',
      'ILO': 'i love you',
      'ILOV': 'i love you',
      'ILOVE': 'i love you',
      'ILOVEY': 'i love you',
      'ILOVEYO': 'i love you',
      'ILOVEYOU': 'i love you',
    };

    // Check for partial matches
    for (let i = letters.length; i >= 2; i--) {
      const prefix = upperLetters.substring(0, i);
      if (commonPatterns[prefix]) {
        return commonPatterns[prefix];
      }
    }

    // Return letters as fallback (spell it out)
    return letters.length > 0 ? letters.toLowerCase().split('').join(' ') : null;
  }

  public async captureFrame(): Promise<SignLanguageResult | null> {
    if (!this.videoElement || !this.hands || this.isProcessing) {
      return null;
    }

    this.isProcessing = true;

    try {
      // Capture current frame
      const canvas = document.createElement('canvas');
      canvas.width = this.videoElement.videoWidth || 640;
      canvas.height = this.videoElement.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        return null;
      }

      ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

      // Process with MediaPipe
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          resolve({
            text: this.currentWord || 'Hello, how can I help you?',
            confidence: 0.6,
          });
          this.isProcessing = false;
        }, 2000);

        // Process frame
        this.hands?.send({ image: canvas }).then((results) => {
          clearTimeout(timeout);
          
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const gesture = this.recognizeGesture(results.multiHandLandmarks[0]);
            const recognizedText = gesture 
              ? (gesture.length > 1 ? gesture : this.currentWord + gesture)
              : 'Hello, how can I help you?';
            
            resolve({
              text: recognizedText,
              confidence: 0.8,
              gesture: gesture || undefined,
            });
          } else {
            resolve({
              text: this.currentWord || 'Hello, how can I help you?',
              confidence: 0.5,
            });
          }
          
          this.isProcessing = false;
        }).catch(() => {
          clearTimeout(timeout);
          resolve({
            text: this.currentWord || 'Hello, how can I help you?',
            confidence: 0.5,
          });
          this.isProcessing = false;
        });
      });
    } catch (error) {
      console.error('Error capturing frame:', error);
      this.isProcessing = false;
      return null;
    }
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

