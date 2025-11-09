import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowRight, Sparkles, Quote as QuoteIcon, BookOpen, MessageSquare, Volume2, Settings as SettingsIcon } from "lucide-react";
import { getDailyQuote, getGreeting } from "@/utils/dailyQuotes";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { getAICompanionUrl } from "@/utils/aiCompanionUrls";

const Dashboard = () => {
  const navigate = useNavigate();
  const { disability, speakText, settings, updateDisability, updateSettings } = useTheme();
  const { profile, user } = useAuth();
  const [userName, setUserName] = useState("Student");

  // Load user name from Supabase profile and sync theme
  useEffect(() => {
    if (profile) {
      setUserName(profile.name?.split(" ")[0] || "Student");
      // Sync theme with user's disability preference from profile
      if (profile.disability && profile.disability !== 'none') {
        updateDisability(profile.disability as any);
      }
      // Sync settings with user's settings from profile
      if (profile.settings) {
        updateSettings(profile.settings);
      }
    } else if (user?.email) {
      // Fallback to email if profile not loaded yet
      setUserName(user.email.split("@")[0]);
    }
  }, [profile, user, updateDisability, updateSettings]);

  // Get daily quote - will be the same throughout the day
  const dailyQuote = useMemo(() => getDailyQuote(), []);
  const greeting = useMemo(() => getGreeting(), []);

  const handleAICompanionClick = () => {
    const externalUrl = getAICompanionUrl(disability);
    if (externalUrl) {
      // For dyslexia and ADHD, redirect to external URL
      window.location.href = externalUrl;
    } else {
      navigate("/ai-companion");
    }
  };

  const handleReadQuote = () => {
    if (settings.textToSpeech) {
      speakText(`Daily quote: ${dailyQuote.text} by ${dailyQuote.author}`);
    }
  };

  // Dyslexia-optimized Dashboard
  if (disability === "dyslexia") {
    return (
      <div className="min-h-screen bg-background relative dyslexia-dashboard-mode">
        {/* Subtle watermark background */}
        <div className="dashboard-watermark fixed inset-0 -z-10" />
        
        <header className="border-b-2 border-border bg-card sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Logo />
              <nav className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/dashboard")}
                  className="text-lg px-6 py-6 h-auto"
                  style={{
                    fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  🏠 Home
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/settings")}
                  className="text-lg px-6 py-6 h-auto"
                  style={{
                    fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  ⚙️ Settings
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full w-14 h-14 p-0 text-2xl"
                  onClick={() => navigate("/profile")}
                >
                  👤
                </Button>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-10">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Welcome Section - Large and Clear */}
            <div className="space-y-6 fade-in">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-primary/15 rounded-full border-2 border-primary/30">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p 
                    className="text-2xl text-muted-foreground mb-2"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.05em",
                      lineHeight: "1.8",
                    }}
                  >
                    {greeting}
                  </p>
                  <h1 
                    className="text-5xl md:text-6xl font-bold text-foreground"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.08em",
                      lineHeight: "1.4",
                    }}
                  >
                    Hi, <span className="text-primary">{userName}</span>! 👋
                  </h1>
                </div>
              </div>
              <p 
                className="text-2xl text-muted-foreground"
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                  letterSpacing: "0.05em",
                  lineHeight: "1.8",
                }}
              >
                Ready to continue your learning journey today? 🚀
              </p>
            </div>

            {/* Daily Quote Card - Large and Interactive */}
            <Card 
              className="relative overflow-hidden fade-in border-2 border-border shadow-lg" 
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/8 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/8 rounded-full -ml-16 -mb-16"></div>
              <CardContent className="p-10 md:p-14 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-5 bg-primary/15 rounded-full shrink-0 border-2 border-primary/30">
                    <QuoteIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-6 flex-1">
                    <div>
                      <p 
                        className="text-3xl md:text-4xl font-semibold leading-relaxed text-foreground"
                        style={{
                          fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                          wordSpacing: "0.1em",
                        }}
                      >
                        "{dailyQuote.text}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1 flex-1 bg-gradient-to-r from-primary/50 to-transparent max-w-xs"></div>
                        <p 
                          className="text-xl font-medium text-muted-foreground"
                          style={{
                            fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          — {dailyQuote.author}
                        </p>
                      </div>
                      {settings.textToSpeech && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleReadQuote}
                          className="h-12 px-6 border-2"
                          style={{
                            fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          <Volume2 className="w-5 h-5 mr-2" />
                          🔊 Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards - Large, Interactive, and Creative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in" style={{ animationDelay: "0.2s" }}>
              {/* AI Companion Card */}
              <Card 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-border hover:border-primary/50" 
                onClick={handleAICompanionClick}
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="p-4 bg-primary/15 rounded-2xl border-2 border-primary/30">
                        <MessageSquare className="w-10 h-10 text-primary" />
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 
                        className="text-3xl font-bold text-foreground"
                        style={{
                          letterSpacing: "0.08em",
                          lineHeight: "1.4",
                        }}
                      >
                        🤖 AI Companion
                      </h3>
                      <p 
                        className="text-xl text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                          wordSpacing: "0.1em",
                        }}
                      >
                        Chat with your AI learning assistant
                      </p>
                      <p 
                        className="text-lg text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                        }}
                      >
                        Ask questions • Get help • Learn together ✨
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg border-2"
                      style={{
                        fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Start Chatting →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Hub Card */}
              <Card 
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 border-border hover:border-primary/50" 
                onClick={() => navigate("/hub")}
                style={{
                  fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="p-4 bg-accent/15 rounded-2xl border-2 border-accent/30">
                        <BookOpen className="w-10 h-10 text-accent" />
                      </div>
                      <div className="p-3 bg-accent/10 rounded-full group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 
                        className="text-3xl font-bold text-foreground"
                        style={{
                          letterSpacing: "0.08em",
                          lineHeight: "1.4",
                        }}
                      >
                        📚 Learning Hub
                      </h3>
                      <p 
                        className="text-xl text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                          wordSpacing: "0.1em",
                        }}
                      >
                        Explore courses and start learning
                      </p>
                      <p 
                        className="text-lg text-muted-foreground"
                        style={{
                          letterSpacing: "0.05em",
                          lineHeight: "1.8",
                        }}
                      >
                        HTML • JavaScript • Python • More! 🎓
                      </p>
                    </div>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full h-14 text-lg border-2"
                      style={{
                        fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Explore Courses →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats or Motivational Section */}
            <Card 
              className="border-2 border-border shadow-lg p-8 fade-in" 
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p 
                    className="text-3xl font-bold text-primary mb-2"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    🌟 You're Doing Great!
                  </p>
                  <p 
                    className="text-xl text-muted-foreground"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.05em",
                      lineHeight: "1.8",
                    }}
                  >
                    Keep learning and growing every day! 💪
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate("/settings")}
                    className="h-14 px-8 text-lg border-2"
                    style={{
                      fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <SettingsIcon className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Standard Dashboard for other disabilities
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle watermark background - ADHD/Dyslexia friendly */}
      <div className="dashboard-watermark fixed inset-0 -z-10" />
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="flex gap-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate("/settings")}>
                Settings
              </Button>
              <Button
                variant="ghost"
                className="rounded-full w-10 h-10 p-0"
                onClick={() => navigate("/profile")}
              >
                👤
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4 fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className={`text-lg ${disability === "vision" ? "text-xl md:text-2xl" : ""} text-muted-foreground`}>{greeting}</p>
                <h1 className={`${disability === "vision" ? "text-6xl md:text-8xl" : "text-4xl md:text-5xl"} font-bold text-foreground`}>
                  Hi, <span className="gradient-text" style={{ fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}>{userName}</span>! 👋
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Ready to continue your learning journey today?
            </p>
          </div>

          {/* Daily Quote Card */}
          <Card className="relative overflow-hidden fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full -ml-12 -mb-12"></div>
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full shrink-0 mt-1">
                  <QuoteIcon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-2xl md:text-3xl font-semibold leading-relaxed text-foreground">
                      "{dailyQuote.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    <p className="text-sm font-medium text-muted-foreground italic">
                      — {dailyQuote.author}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow" onClick={handleAICompanionClick}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">AI Companion</h3>
                    <p className="text-sm text-muted-foreground">
                      Chat with your AI learning assistant
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full w-12 h-12 p-0 group-hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow" onClick={() => navigate("/hub")}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Learning Hub</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore courses and start learning
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full w-12 h-12 p-0 group-hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
