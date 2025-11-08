import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
    const user = localStorage.getItem("comrade_user");
    return user ? JSON.parse(user).name.split(" ")[0] : "Student";
  });

  const quote = {
    text: "The single biggest problem in communication is the illusion that it has taken place.",
    author: "George Bernard Shaw",
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="flex gap-6">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate("/settings")}>
                Settings
              </Button>
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => navigate("/settings")}
              >
                👤
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-left">
            <h1 className="text-5xl font-bold text-foreground mb-4">Hello, {userName}</h1>
          </div>

          <Card className="p-8 bg-card">
            <div className="text-left space-y-4">
              <blockquote className="text-3xl font-semibold leading-relaxed">
                "<span className="text-primary">The single biggest problem</span>{" "}
                <span className="text-secondary">in communication</span>{" "}
                <span className="text-accent">is the illusion</span>{" "}
                <span className="text-muted-foreground">that it has taken place</span>."
              </blockquote>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/ai-companion")}
            >
              Talk to your AI <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/hub")}
            >
              Learn Programming <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
