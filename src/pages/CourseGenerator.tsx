import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CourseGenerator = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!language.trim()) {
      toast.error("Please enter a programming language");
      return;
    }

    setIsGenerating(true);
    toast.success(`Generating ${language} course...`);

    // Simulate course generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Course created successfully!");
      navigate("/hub");
    }, 2000);
  };

  const suggestions = ["Python", "JavaScript", "Java", "C++", "Ruby", "Go"];

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

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Generate Your Course</h1>
            <p className="text-lg text-muted-foreground">
              Enter any programming language and we'll create a personalized 30-day learning plan
              just for you
            </p>
          </div>

          <Card className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-lg">
                Which programming language would you like to learn?
              </Label>
              <Input
                id="language"
                placeholder="e.g., Python, JavaScript, Java..."
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-lg p-6"
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Popular suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((lang) => (
                  <Button
                    key={lang}
                    variant="outline"
                    size="sm"
                    onClick={() => setLanguage(lang)}
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-lg py-6"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Course"}
            </Button>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Your course will be tailored to your learning preferences and disability settings
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseGenerator;
