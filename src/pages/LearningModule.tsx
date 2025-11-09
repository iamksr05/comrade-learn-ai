import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ArrowRight, CheckCircle, Volume2, Play, Pause } from "lucide-react";
import { Course } from "@/types/disability";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

const LearningModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentDay, setCurrentDay] = useState(1);
  const { settings, disability } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Stop speech when module changes or component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentDay]);

  // Load speech synthesis voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Load all courses from localStorage and filter based on disability
  useEffect(() => {
    const savedCourses = localStorage.getItem("allCourses");
    if (savedCourses) {
      try {
        const parsedCourses: Course[] = JSON.parse(savedCourses);
        
        // Filter courses based on user's disability
        const filteredCourses = parsedCourses.filter((course) => {
          if (disability === "dyslexia") {
            // Dyslexia users only see dyslexia courses
            return course.id.includes("dyslexia") || course.id === "codeease-html-dyslexia";
          } else if (disability === "adhd") {
            // ADHD users only see ADHD courses
            return course.id.includes("adhd") || course.id === "codefocus-html-adhd";
          }
          // Other users see no special courses
          return false;
        });
        
        setAllCourses(filteredCourses);
      } catch (error) {
        console.error("Error loading saved courses:", error);
      }
    }
  }, [disability]);

  const course = allCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p>Course not found</p>
      </div>
    );
  }

  const currentModule = course.modules[currentDay - 1];
  const progress = Math.round((currentDay / course.modules.length) * 100);

  const handleNext = () => {
    if (currentDay < course.modules.length) {
      setCurrentDay(currentDay + 1);
      toast.success("Moving to next module");
      window.scrollTo(0, 0);
      // Stop any ongoing speech when moving to next module
      if (isSpeaking) {
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      }
    } else {
      toast.success("Course completed! 🎉");
      navigate("/hub");
    }
  };

  const handlePrevious = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      window.scrollTo(0, 0);
      // Stop any ongoing speech when moving to previous module
      if (isSpeaking) {
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      }
    }
  };

  const handleTextToSpeech = () => {
    if (!settings.textToSpeech) {
      toast.error("Please enable text-to-speech in settings first");
      return;
    }

    const synth = window.speechSynthesis;
    if (!synth) {
      toast.error("Text-to-speech is not supported in your browser");
      return;
    }

    if (isSpeaking || synth.speaking) {
      // Stop speech
      synth.cancel();
      setIsSpeaking(false);
      toast.info("Speech stopped");
      return;
    }

    // Prepare text to read
    const textToRead = `${currentModule.title}. ${currentModule.description}. ${currentModule.content}`;
    
    // Clean up markdown formatting for better speech
    const cleanText = textToRead
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.+?)\*/g, '$1') // Remove italic
      .replace(/`(.+?)`/g, '$1') // Remove code blocks
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links, keep text
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double
      .replace(/🎯|💡|🎨|🧠|✅|❌|📝|🌟|✨|🚀|💪|📚|🎓|🤖|👋|🏠|⚙️|👤|🔍|📖/g, '') // Remove emojis
      .trim();

    if (!cleanText) {
      toast.error("No content to read");
      return;
    }

    setIsSpeaking(true);
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Configure for better speech (especially for dyslexia)
    utterance.rate = disability === "dyslexia" ? 0.8 : 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Function to set voice and speak (voices might not be loaded immediately)
    const setVoiceAndSpeak = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(
          (voice) => voice.name.includes("Google") || voice.name.includes("Samantha") || voice.name.includes("Natural")
        ) || voices.find((voice) => voice.lang.startsWith("en"));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }
      synth.speak(utterance);
    };

    // Try to get voices immediately
    const voices = synth.getVoices();
    if (voices.length > 0) {
      setVoiceAndSpeak();
    } else {
      // Wait for voices to load
      const voicesChanged = () => {
        setVoiceAndSpeak();
        synth.onvoiceschanged = null;
      };
      synth.onvoiceschanged = voicesChanged;
      // Fallback: speak after a short delay even if voices haven't loaded
      setTimeout(() => {
        if (synth.getVoices().length === 0) {
          synth.speak(utterance);
        }
      }, 100);
    }

    // Handle speech end
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    // Handle speech error
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      toast.error("Error reading text");
    };

    toast.success("Reading module content...");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" onClick={() => navigate("/hub")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Day {currentDay} of {course.modules.length}</span>
              <span>•</span>
              <span>{currentModule.duration}</span>
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <h2 className="text-2xl font-bold">{currentModule.title}</h2>
                </div>
                <p className="text-muted-foreground">{currentModule.description}</p>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {currentModule.content}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    variant={isSpeaking ? "default" : "outline"}
                    onClick={handleTextToSpeech}
                    className="h-12 px-6"
                    disabled={!settings.textToSpeech}
                  >
                    {isSpeaking ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Stop Reading
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5 mr-2" />
                        Read Aloud
                      </>
                    )}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {settings.textToSpeech 
                      ? "Click to hear the content read aloud" 
                      : "Enable text-to-speech in settings to use this feature"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentDay === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button size="lg" onClick={handleNext}>
              {currentDay === course.modules.length ? "Complete Course" : "Next Module"}{" "}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningModule;
