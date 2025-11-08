import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowRight, Sparkles, Quote as QuoteIcon } from "lucide-react";
import { getDailyQuote, getGreeting } from "@/utils/dailyQuotes";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
    const user = localStorage.getItem("comrade_user");
    return user ? JSON.parse(user).name.split(" ")[0] : "Student";
  });

  // Get daily quote - will be the same throughout the day
  const dailyQuote = useMemo(() => getDailyQuote(), []);
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <div className="min-h-screen bg-background">
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
                onClick={() => navigate("/settings")}
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
                <p className="text-lg text-muted-foreground">{greeting}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Hi, <span className="gradient-text">{userName}</span>! 👋
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
                  <p className="text-xs text-muted-foreground pt-2">
                    💡 Daily inspiration • Changes every day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-glow" onClick={() => navigate("/ai-companion")}>
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
                    variant="secondary"
                    className="rounded-full w-12 h-12 p-0 group-hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              variant="outline"
              className="flex-1 md:flex-none"
              onClick={() => navigate("/course-generator")}
            >
              Create Course
            </Button>
            <Button
              variant="outline"
              className="flex-1 md:flex-none"
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
