import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { ArrowLeft, ArrowRight, CheckCircle, Play } from "lucide-react";
import { sampleCourses } from "@/data/sampleCourses";
import { toast } from "sonner";

const LearningModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentDay, setCurrentDay] = useState(1);

  const course = sampleCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    } else {
      toast.success("Course completed! 🎉");
      navigate("/hub");
    }
  };

  const handlePrevious = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      window.scrollTo(0, 0);
    }
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

              <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Play className="w-5 h-5" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Text-to-speech available
                </span>
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
