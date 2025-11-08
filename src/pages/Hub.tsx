import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { MessageSquare, Plus, BookOpen } from "lucide-react";
import { sampleCourses } from "@/data/sampleCourses";

const Hub = () => {
  const navigate = useNavigate();
  const courses = sampleCourses;

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
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Learning Hub</h1>
            <p className="text-lg text-muted-foreground">
              Your personalized learning center
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/ai-companion")}
            >
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Talk to Your AI Companion</h3>
              <p className="text-muted-foreground">
                Get help, ask questions, or chat about your learning journey
              </p>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate("/course-generator")}
            >
              <Plus className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Generate a New Course</h3>
              <p className="text-muted-foreground">
                Create a personalized 30-day learning plan for any programming language
              </p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            {courses.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Generate your first course to get started!
                </p>
                <Button onClick={() => navigate("/course-generator")}>
                  Create Course
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </main>
    </div>
  );
};

export default Hub;
