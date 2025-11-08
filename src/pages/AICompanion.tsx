import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Send, Mic, Volume2, Loader2, Settings, User } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { AIAdapter, type AIMessage } from "@/utils/aiAdapter";
import { SignLanguageInput } from "@/components/SignLanguageInput";
import { SignLanguageOutput } from "@/components/SignLanguageOutput";

interface SignLanguageResponse {
  transcript: string;
  simplifiedSummary: string;
  videoUrl?: string;
}

const AICompanion = () => {
  const navigate = useNavigate();
  const { disability } = useTheme();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signLanguageResponse, setSignLanguageResponse] = useState<SignLanguageResponse | null>(null);
  const [isAIConnected, setIsAIConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null;
  const hasInitialized = useRef(false);

  // Check if AI API is configured
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setIsAIConnected(!!apiKey);
  }, []);

  // Initialize with disability-aware greeting (only on mount)
  useEffect(() => {
    if (!hasInitialized.current) {
      const greeting = AIAdapter.generateContextualResponse("hello", disability);
      setMessages([{ role: "assistant", content: greeting }]);
      hasInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load speech synthesis voices
  useEffect(() => {
    if (speechSynthesis) {
      // Voices might not be loaded immediately
      const loadVoices = () => {
        speechSynthesis.getVoices();
      };
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, [speechSynthesis]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: AIMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Generate disability-aware response
      const response = await AIAdapter.generateResponse({
        disability,
        userMessage: userMessage.content,
        conversationHistory: messages,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (!speechSynthesis) {
      alert("Text-to-speech is not supported in your browser.");
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure for better speech (especially for dyslexia)
    utterance.rate = disability === "dyslexia" ? 0.8 : 1.0; // Slower for dyslexia
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to use a more natural voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (voice) => voice.name.includes("Google") || voice.name.includes("Samantha")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  };

  const handleSignLanguageInput = async (text: string) => {
    setIsLoading(true);
    setSignLanguageResponse(null);

    try {
      // Generate disability-aware response
      const response = await AIAdapter.generateResponse({
        disability,
        userMessage: text,
        conversationHistory: messages,
      });

      // Create sign language response with transcript and summary
      // Format transcript to be clear and ASL-friendly
      const cleanResponse = response.replace(/━━━━━━━━━━━━━━━━/g, '').replace(/💡|✅|❌|📝/g, '').trim();
      const transcript = `Hello! I'm Comrade AI, your learning companion. I've received your message and translated it into American Sign Language (ASL) in the video above. ${cleanResponse}`;
      
      // Generate simplified summary (first sentence or first 80 characters)
      const firstLine = cleanResponse.split('\n\n')[0] || cleanResponse.split('.')[0];
      const simplifiedSummary = firstLine.length > 100 
        ? firstLine.substring(0, 100).trim() + "..."
        : firstLine.trim() || "Hi, I'm Comrade AI. The video shows your message in sign language.";

      setSignLanguageResponse({
        transcript,
        simplifiedSummary,
        // In production, this would be a generated ASL video URL
        // videoUrl: await generateASLVideo(response)
      });

      // Also add to messages for history
      setMessages((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setSignLanguageResponse({
        transcript: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        simplifiedSummary: "Error processing request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Special interface for hearing-impaired users
  if (disability === "hearing") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" onClick={() => navigate("/hub")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold">AI Learning Companion</h1>
                {isAIConnected ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>AI Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Using Fallback Mode</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground">
                👀 Sign language input and output • Visual-first communication
              </p>
              {!isAIConnected && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    ⚠️ <strong>AI API not configured.</strong> Add your OpenAI API key to <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">.env</code> file for real AI conversations. See <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">AI_API_SETUP.md</code> for instructions.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Your Input Panel */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Input</h2>
                <SignLanguageInput
                  onSignLanguageDetected={handleSignLanguageInput}
                  onTextInput={handleSignLanguageInput}
                />
              </Card>

              {/* AI Response Panel */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI Response</h2>
                {isLoading ? (
                  <div className="flex items-center justify-center h-[500px]">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Processing your request...</p>
                      <p className="text-sm text-muted-foreground mt-2">Generating sign language response...</p>
                    </div>
                  </div>
                ) : signLanguageResponse ? (
                  <SignLanguageOutput
                    transcript={signLanguageResponse.transcript}
                    simplifiedSummary={signLanguageResponse.simplifiedSummary}
                    videoUrl={signLanguageResponse.videoUrl}
                  />
                ) : (
                  <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                    <div className="text-center">
                      <p className="text-lg mb-2">👋 Ready to help!</p>
                      <p>Type your message or use sign language to get started.</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Standard interface for other disabilities
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">AI Learning Companion</h1>
              {isAIConnected ? (
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Using Fallback Mode</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">
              {disability === "adhd" && "🎯 Short, focused answers to keep you engaged"}
              {disability === "dyslexia" && "📖 Clear, simple explanations to help you learn"}
              {disability === "vision" && "🔍 Detailed, descriptive responses for screen readers"}
              {(!disability || disability === "none") && "Ask questions, get explanations, or chat about your learning"}
            </p>
            {disability && disability !== "none" && (
              <div className="mt-2 text-sm text-muted-foreground">
                💡 Responses optimized for {disability === "adhd" && "ADHD"}
                {disability === "dyslexia" && "Dyslexia"}
                {disability === "vision" && "Vision Impairment"} users
              </div>
            )}
            {!isAIConnected && (
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  ⚠️ <strong>AI API not configured.</strong> Add your OpenAI API key to <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">.env</code> file for real AI conversations. See <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">AI_API_SETUP.md</code> for instructions.
                </p>
              </div>
            )}
          </div>

          <Card className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Start a conversation to begin learning...</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} fade-in`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-secondary text-foreground rounded-tl-none"
                      } ${
                        disability === "dyslexia" ? "leading-relaxed" : ""
                      } ${
                        disability === "vision" ? "text-base" : ""
                      }`}
                    >
                      <div 
                        className={`whitespace-pre-wrap ${
                          disability === "dyslexia" ? "text-base leading-7" : ""
                        } ${
                          disability === "vision" ? "text-base" : ""
                        } ${
                          disability === "hearing" ? "font-medium" : ""
                        }`}
                        style={{
                          fontFamily: disability === "dyslexia" ? "'Comic Sans MS', 'Trebuchet MS', sans-serif" : "inherit",
                          letterSpacing: disability === "dyslexia" ? "0.05em" : "inherit",
                        }}
                      >
                        {message.content}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex gap-2 mt-3">
                          {(disability === "dyslexia" || disability === "vision") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() => handleTextToSpeech(message.content)}
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Read aloud
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground rounded-2xl rounded-tl-none p-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={
                    disability === "adhd" ? "Ask me anything... 🎯" :
                    disability === "dyslexia" ? "Type your question..." :
                    disability === "hearing" ? "Type your message... 👀" :
                    disability === "vision" ? "Type your question..." :
                    "Type your message..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className={`flex-1 ${
                    disability === "dyslexia" || disability === "vision" ? "text-base" : ""
                  }`}
                  disabled={isLoading}
                />
                {disability === "hearing" && (
                  <Button 
                    size="icon" 
                    variant="outline"
                    title="Voice input (coming soon)"
                    disabled
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                )}
                <Button 
                  size="icon" 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AICompanion;
