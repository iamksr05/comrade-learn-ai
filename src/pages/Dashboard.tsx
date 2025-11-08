import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    Home <ChevronDown className="ml-1 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate("/ai-companion")}>
                    Talk to your AI companion
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/hub")}>
                    Learn Programming
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          <div className="text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">Hello, {userName}</h1>
          </div>

          <Card className="p-8 bg-card">
            <div className="text-center space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Thought for the Day
              </p>
              <blockquote className="text-2xl font-semibold text-foreground leading-relaxed">
                {quote.text}
              </blockquote>
              <p className="text-lg text-primary">— {quote.author}</p>
            </div>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/hub")}
            >
              Go to Hub <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
