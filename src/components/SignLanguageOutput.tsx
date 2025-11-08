import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Volume2 } from "lucide-react";

interface SignLanguageOutputProps {
  transcript: string;
  simplifiedSummary: string;
  videoUrl?: string;
}

export function SignLanguageOutput({ transcript, simplifiedSummary, videoUrl }: SignLanguageOutputProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // For demo purposes, we'll use a placeholder video
  // In production, this would be generated from the AI response
  const defaultVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

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

  // Simulate ASL video - In production, this would be generated from text-to-ASL
  // For now, we'll show a placeholder that represents an ASL interpreter
  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            playsInline
          />
        ) : (
          // Placeholder for ASL video - in production this would be a real ASL video
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="relative w-32 h-32 mx-auto mb-4">
                {/* Animated ASL interpreter placeholder */}
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/40 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👋</span>
                  </div>
                </div>
              </div>
              <p className="text-lg font-semibold mb-2">ASL Video Response</p>
              <p className="text-sm text-white/70 mb-4">Your message translated to American Sign Language</p>
              <p className="text-xs text-white/50">In production: Real-time ASL video generation</p>
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
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
              className="text-white hover:bg-white/20"
              title="Closed Captions"
            >
              <span className="text-xs font-bold">CC</span>
            </Button>

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
      </div>

      {/* Synchronized Transcript */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-muted-foreground">Synchronized Transcript</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-foreground leading-relaxed">{transcript}</p>
        </div>
      </div>

      {/* Simplified Summary */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase text-muted-foreground">Simplified Summary</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-foreground leading-relaxed">{simplifiedSummary}</p>
        </div>
      </div>
    </div>
  );
}

