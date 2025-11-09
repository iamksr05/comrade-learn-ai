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
import { getAICompanionUrl } from "@/utils/aiCompanionUrls";
import { toast } from "sonner";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = typeof window !== "undefined" ? window.speechSynthesis : null;
  const hasInitialized = useRef(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasRedirected = useRef(false);

  // Redirect to external AI Companion if special ability requires it (ADHD or Dyslexia)
  useEffect(() => {
    // Only redirect once and only if there's an external URL
    if (!hasRedirected.current) {
      const externalUrl = getAICompanionUrl(disability);
      if (externalUrl && (disability === "adhd" || disability === "dyslexia")) {
        hasRedirected.current = true;
        window.location.href = externalUrl;
        return;
      }
    }
  }, [disability]);

  // Early return if redirecting (prevent rendering)
  if (hasRedirected.current && (disability === "adhd" || disability === "dyslexia")) {
    return null;
  }

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
      if (speechUtteranceRef.current) {
        speechUtteranceRef.current = null;
      }
    };
  }, [speechSynthesis]);

  // Initialize with special ability-aware greeting (only on mount)
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
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    // Update messages with user message immediately
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Generate special ability-aware response with updated conversation history
      // Use functional update to get the latest messages state
      const response = await AIAdapter.generateResponse({
        disability,
        userMessage: userInput,
        conversationHistory: [...messages, userMessage], // Use updated messages that include the current user message
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = error instanceof Error 
        ? `I apologize, but I encountered an error: ${error.message}. Please try again.`
        : "I apologize, but I'm having trouble processing your request right now. Please try again.";
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (!speechSynthesis) {
      toast.error("Text-to-speech is not supported in your browser.");
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();
    if (speechUtteranceRef.current) {
      speechUtteranceRef.current = null;
    }

    // Clean text: remove markdown, emojis, and extra whitespace
    const cleanText = text
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.+?)\*/g, '$1') // Remove italic
      .replace(/[💡✅❌📝🎯✨🌟🚀💪📚🎓🤖👋🏠⚙️👤🔍📖🤟👀📥📤💬👤🤖]/g, '') // Remove emojis
      .replace(/━━━━━━━━━━━━━━━━/g, '') // Remove separators
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
      .trim();

    if (!cleanText) {
      toast.error("No text to speak.");
      return;
    }

    // Wait for voices to be loaded if needed
    const speakWithVoice = () => {
      const voices = speechSynthesis.getVoices();
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      speechUtteranceRef.current = utterance;
      
      // Configure for better speech (especially for dyslexia)
      utterance.rate = disability === "dyslexia" ? 0.8 : 1.0; // Slower for dyslexia
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to use a more natural voice
      const preferredVoice = voices.find(
        (voice) => voice.name.includes("Google") || voice.name.includes("Samantha") || voice.name.includes("Karen")
      ) || voices.find(voice => voice.lang.startsWith("en"));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Handle speech end and errors
      utterance.onend = () => {
        speechUtteranceRef.current = null;
      };

      utterance.onerror = (error) => {
        console.error("Speech synthesis error:", error);
        speechUtteranceRef.current = null;
        toast.error("Error during text-to-speech playback.");
      };

      try {
        speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Error starting speech:", error);
        toast.error("Failed to start text-to-speech.");
        speechUtteranceRef.current = null;
      }
    };

    // Check if voices are loaded
    const voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Wait for voices to load
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.onvoiceschanged = null; // Remove handler after first call
        speakWithVoice();
      };
      // Fallback: try after a short delay
      setTimeout(() => {
        if (speechSynthesis.getVoices().length > 0) {
          speakWithVoice();
        } else {
          // Still no voices, try anyway
          speakWithVoice();
        }
      }, 100);
    } else {
      speakWithVoice();
    }
  };

  const handleSignLanguageInput = async (text: string) => {
    if (!text.trim()) {
      toast.error("Please provide input via sign language or text");
      return;
    }

    if (isLoading) {
      toast.warning("Please wait for the current request to complete.");
      return;
    }

    setIsLoading(true);
    setSignLanguageResponse(null);

    // Add user message to history
    const userMessage: AIMessage = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Generate special ability-aware response (optimized for hearing-impaired users - visual-first)
      const response = await AIAdapter.generateResponse({
        disability: "hearing", // Force hearing mode for visual-first responses
        userMessage: text.trim(),
        conversationHistory: updatedMessages, // Use updated messages that include the current user message
      });

      // Clean response for better readability
      const cleanResponse = response
        .replace(/━━━━━━━━━━━━━━━━/g, '')
        .replace(/💡|✅|❌|📝|🎯|✨|🌟|🚀|💪|📚|🎓|🤖|👋|🏠|⚙️|👤|🔍|📖/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.+?)\*/g, '$1') // Remove italic
        .trim();

      // Create full transcript with context
      const transcript = `${cleanResponse}`;
      
      // Generate simplified summary (first 2 sentences or first 150 characters)
      const sentences = cleanResponse.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const simplifiedSummary = sentences.length > 0
        ? (sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '')).trim()
        : cleanResponse.substring(0, 150).trim() + (cleanResponse.length > 150 ? '...' : '');

      // Store the response
      setSignLanguageResponse({
        transcript,
        simplifiedSummary,
        // Note: In production, videoUrl would be generated from text-to-ASL service
        // For now, we'll use a placeholder that indicates ASL translation
        videoUrl: undefined, // Will be handled by SignLanguageOutput component
      });

      // Also add assistant response to messages for history
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanResponse },
      ]);

      toast.success("Response generated! View in sign language and text below.");
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = error instanceof Error 
        ? `I apologize, but I encountered an error: ${error.message}. Please try again.`
        : "I apologize, but I'm having trouble processing your request right now. Please try again.";
      
      setSignLanguageResponse({
        transcript: errorMessage,
        simplifiedSummary: "Error processing request. Please try again.",
      });
      
      // Add error to messages
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMessage },
      ]);
      
      toast.error("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Special interface for hearing-impaired users
  if (disability === "hearing") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b-2 border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
                  <Settings className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" onClick={() => navigate("/hub")}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold">🤟 AI Learning Companion</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                👀 Sign language input and output • Visual-first communication
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Use sign language or type your message • Get responses in both ASL video and text
              </p>
            </div>

            {/* Input Section */}
            <Card className="p-6 border-2 border-border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                📥 Your Input
              </h2>
              <div className="w-full">
                <SignLanguageInput
                  onSignLanguageDetected={handleSignLanguageInput}
                  onTextInput={handleSignLanguageInput}
                />
              </div>
            </Card>

            {/* Response Section */}
            <Card className="p-6 border-2 border-border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                📤 AI Response
              </h2>
              {isLoading ? (
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-16 h-16 animate-spin mx-auto text-primary" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-foreground">Processing your request...</p>
                      <p className="text-sm text-muted-foreground">Generating sign language response...</p>
                      <p className="text-xs text-muted-foreground">This may take a few seconds</p>
                    </div>
                  </div>
                </div>
              ) : signLanguageResponse ? (
                <div className="space-y-6">
                  <SignLanguageOutput
                    transcript={signLanguageResponse.transcript}
                    simplifiedSummary={signLanguageResponse.simplifiedSummary}
                    videoUrl={signLanguageResponse.videoUrl}
                  />
                  
                  {/* Conversation History */}
                  {messages.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold mb-4">💬 Conversation History</h3>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              message.role === "user"
                                ? "bg-primary/10 border border-primary/20"
                                : "bg-secondary border border-border"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-semibold text-sm">
                                {message.role === "user" ? "👤 You:" : "🤖 AI:"}
                              </span>
                              <p className="flex-1 text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">👋</div>
                    <p className="text-2xl font-semibold">Ready to help!</p>
                    <p className="text-lg">Type your message or use sign language to get started.</p>
                    <p className="text-sm">You'll receive responses in both sign language and text format.</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Dyslexia-optimized interface
  if (disability === "dyslexia") {
    return (
      <div className="min-h-screen bg-background dyslexia-chat-mode">
        <header className="border-b-2 border-border bg-card">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Logo />
              <Button 
                variant="ghost" 
                onClick={() => navigate("/hub")}
                className="text-lg px-6 py-6 h-auto"
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                <ArrowLeft className="w-5 h-5 mr-3" /> Back to Hub
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Section - Large and Clear */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 
                  className="text-4xl md:text-5xl font-bold"
                  style={{
                    fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                    letterSpacing: "0.08em",
                    lineHeight: "1.4",
                  }}
                >
                  📖 AI Learning Companion
                </h1>
              </div>
              <p 
                className="text-xl text-muted-foreground"
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                  letterSpacing: "0.05em",
                  lineHeight: "1.8",
                }}
              >
                ✨ Easy-to-read responses for everyone
              </p>
              <p 
                className="text-lg text-muted-foreground"
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                  letterSpacing: "0.05em",
                  lineHeight: "1.8",
                }}
              >
                🎯 Optimized for dyslexia-friendly reading
              </p>
            </div>

            {/* Chat Container - Large and Spacious */}
            <Card className="h-[700px] flex flex-col border-2 border-border" style={{ fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif" }}>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center space-y-4">
                      <p 
                        className="text-2xl text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                        }}
                      >
                        👋 Hello! Ready to learn?
                      </p>
                      <p 
                        className="text-xl text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                        }}
                      >
                        Start a conversation to begin!
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} fade-in`}
                    >
                      <div
                        className={`max-w-[80%] p-6 rounded-3xl border-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground border-primary rounded-tr-sm"
                            : "bg-card text-foreground border-border rounded-tl-sm shadow-md"
                        }`}
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                          wordSpacing: "0.1em",
                        }}
                      >
                        <div 
                          className="whitespace-pre-wrap text-lg"
                          style={{
                            fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                            letterSpacing: "0.05em",
                            lineHeight: "1.8",
                            wordSpacing: "0.1em",
                          }}
                        >
                          {message.content}
                        </div>
                        {message.role === "assistant" && (
                          <div className="flex gap-3 mt-4">
                            <Button
                              variant="outline"
                              size="lg"
                              className="h-12 px-6 text-base border-2"
                              onClick={() => handleTextToSpeech(message.content)}
                              style={{
                                fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                                letterSpacing: "0.05em",
                              }}
                            >
                              <Volume2 className="w-5 h-5 mr-2" />
                              🔊 Read Aloud
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card text-foreground rounded-3xl rounded-tl-sm p-6 border-2 border-border shadow-md">
                      <div className="flex items-center gap-4">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span 
                          className="text-lg"
                          style={{
                            fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Large and Clear */}
              <div className="border-t-2 border-border p-6 bg-muted/30">
                <div className="flex gap-4">
                  <Input
                    placeholder="Type your question here... (Ask anything you want to learn!)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    className="flex-1 text-lg h-14 px-6 border-2"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.05em",
                      fontSize: "1.125rem",
                    }}
                    disabled={isLoading}
                  />
                  <Button 
                    size="lg"
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="h-14 px-8 text-lg border-2"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.05em",
                      minWidth: "120px",
                    }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
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
            </div>
            <p className="text-muted-foreground">
              {disability === "adhd" && "🎯 Short, focused answers to keep you engaged"}
              {disability === "vision" && "🔍 Detailed, descriptive responses for screen readers"}
              {(!disability || disability === "none") && "Ask questions, get explanations, or chat about your learning"}
            </p>
            {disability && disability !== "none" && disability !== "dyslexia" && (
              <div className="mt-2 text-sm text-muted-foreground">
                💡 Responses optimized for {disability === "adhd" && "ADHD"}
                {disability === "vision" && "Vision Impairment"} users
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
                        disability === "vision" ? "text-base" : ""
                      }`}
                    >
                      <div 
                        className={`whitespace-pre-wrap ${
                          disability === "vision" ? "text-base" : ""
                        } ${
                          disability === "hearing" ? "font-medium" : ""
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex gap-2 mt-3">
                          {disability === "vision" && (
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
                    disability === "vision" ? "text-base" : ""
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
