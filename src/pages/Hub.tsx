import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/Logo";
import { Plus, BookOpen, Sparkles } from "lucide-react";
import { createDyslexiaHTMLCourse } from "@/data/dyslexiaHTMLCourse";
import { createADHDHTMLCourse } from "@/data/adhdHTMLCourse";
import { Course } from "@/types/disability";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Hub = () => {
  const navigate = useNavigate();
  const { disability } = useTheme();
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const suggestions = ["Python", "JavaScript", "HTML", "Java", "C++", "Ruby", "Go", "TypeScript"];

  // Load all courses from localStorage on mount and when disability changes
  useEffect(() => {
    const loadCourses = () => {
      setIsLoading(true);
      try {
        const savedCourses = localStorage.getItem("allCourses");
        if (savedCourses) {
          const parsed = JSON.parse(savedCourses);
          // Remove HTML courses (both dyslexia and ADHD) to allow regeneration
          const filteredCourses = parsed.filter(
            (course: Course) => 
              course.id !== "codeease-html-dyslexia" && 
              course.id !== "codefocus-html-adhd" &&
              !course.id.includes("html")
          );
          setAllCourses(filteredCourses);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        toast.error("Failed to load courses");
      }
      setIsLoading(false);
    };

    loadCourses();
  }, [disability]);

  // Filter courses based on user's disability
  const courses = allCourses.filter((course) => {
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

  // Function to clear all courses
  const handleClearCourses = () => {
    localStorage.removeItem("allCourses");
    setAllCourses([]);
    toast.success("All courses cleared! You can now generate new courses.");
  };

  const handleGenerate = async () => {
    if (!language.trim()) {
      toast.error("Please enter a programming language");
      return;
    }

    setIsGenerating(true);
    toast.success(`Generating ${language} course...`);

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const languageLower = language.trim().toLowerCase();
    let newCourse: Course | null = null;

    if (disability === "dyslexia" && (languageLower === "html" || languageLower.includes("html"))) {
      newCourse = createDyslexiaHTMLCourse();
      const courseExists = allCourses.some(c => c.id === newCourse!.id);
      if (courseExists) {
        toast.info("This course already exists in your Learning Hub!");
        setIsGenerating(false);
        setIsDialogOpen(false);
        setLanguage("");
        return;
      }
    } else if (disability === "adhd" && (languageLower === "html" || languageLower.includes("html"))) {
      newCourse = createADHDHTMLCourse();
      const courseExists = allCourses.some(c => c.id === newCourse!.id);
      if (courseExists) {
        toast.info("This course already exists in your Learning Hub!");
        setIsGenerating(false);
        setIsDialogOpen(false);
        setLanguage("");
        return;
      }
    } else {
      toast.info("Special courses are currently available for dyslexia and ADHD users with HTML. More courses coming soon!");
      setIsGenerating(false);
      setIsDialogOpen(false);
      setLanguage("");
      return;
    }

    if (newCourse) {
      // Save course to localStorage
      const updatedCourses = [...allCourses, newCourse];
      setAllCourses(updatedCourses);
      localStorage.setItem("allCourses", JSON.stringify(updatedCourses));
      
      if (disability === "dyslexia") {
        toast.success("CodeEase HTML course created! Perfect for dyslexia-friendly learning! 🎯");
      } else {
        toast.success("CodeFocus HTML course created! Perfect for ADHD-friendly learning with gamification! 🎮");
      }
    }

    setIsGenerating(false);
    setIsDialogOpen(false);
    setLanguage("");
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
                onClick={() => navigate("/profile")}
              >
                👤
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with Generate Course Button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Learning Hub</h1>
              <p className="text-lg text-muted-foreground">
                Your personalized learning center
              </p>
            </div>
            <div className="flex gap-2">
              {courses.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleClearCourses}
                  className="flex items-center gap-2"
                >
                  Clear Courses
                </Button>
              )}
              <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Generate Course
              </Button>
            </div>
          </div>

          {/* Course Cards */}
          {courses.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-4">
                Generate your first course to get started!
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/learning/${course.id}`)}
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{course.duration}</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full capitalize">
                        {course.difficulty}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Generate Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generate Your Course
            </DialogTitle>
            <DialogDescription>
              {disability === "dyslexia" 
                ? "Enter 'HTML' for a special 10-day dyslexia-friendly course"
                : disability === "adhd"
                ? "Enter 'HTML' for a special 10-day ADHD-friendly course with gamification"
                : "Enter any programming language and we'll create a personalized learning plan just for you"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-base">
                Which programming language would you like to learn?
              </Label>
              <Input
                id="language"
                placeholder="e.g., Python, JavaScript, Java..."
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-base"
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

            <div className="text-xs text-muted-foreground">
              <p>
                Your course will be tailored to your learning preferences and special ability settings
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hub;
