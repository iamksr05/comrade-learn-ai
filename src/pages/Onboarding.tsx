import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FeatureCheckItem } from "@/components/FeatureCheckItem";
import { Contrast, Type, Volume2, ZoomIn } from "lucide-react";
import { Card } from "@/components/ui/card";

const Onboarding = () => {
  const navigate = useNavigate();
  const [userName] = useState(() => {
    const user = localStorage.getItem("comrade_user");
    return user ? JSON.parse(user).name : "Student";
  });

  const features = [
    {
      icon: Contrast,
      title: "High-Contrast Mode",
      description: "Enhanced visibility with a color scheme designed for readability.",
    },
    {
      icon: Type,
      title: "Simplified Text",
      description: "Content is rephrased for clarity and easier understanding.",
    },
    {
      icon: Volume2,
      title: "Text-to-Speech",
      description: "Listen to written text read aloud to you.",
    },
    {
      icon: ZoomIn,
      title: "Larger Font Size",
      description: "Text is displayed in a larger, more readable size.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <div className="flex gap-2">
            <Button variant="ghost" className="rounded-full">
              ⚙️
            </Button>
            <Button variant="ghost" className="rounded-full">
              ❓
            </Button>
            <Button variant="ghost" className="rounded-full bg-orange-200">
              🔊
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Your Personalized Interface is Ready!
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on your answers, we've set up Comrade to help you learn best. Here's what
              we've enabled:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {features.map((feature) => (
                <FeatureCheckItem key={feature.title} {...feature} />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Your Learning Hub Preview</h3>
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-primary/20 text-primary p-4 rounded-2xl rounded-tl-none">
                      <p className="font-medium">Hey! How's the Python course going?</p>
                    </div>
                    <div className="bg-card p-4 rounded-2xl rounded-tr-none ml-auto max-w-xs">
                      <p className="font-medium">It's going well! I just finished Day 5.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/6" />
                    </div>
                    <span className="text-sm font-medium">17%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Python Course Progress</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Looks Great, Let's Start!
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/settings")}>
              Make Adjustments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
