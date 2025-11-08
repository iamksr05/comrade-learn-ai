import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { DisabilityCard } from "@/components/DisabilityCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Eye, EyeOff, Ear, Brain, Type } from "lucide-react";
import { DisabilityType } from "@/types/disability";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { updateDisability } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    disability: "" as DisabilityType,
  });

  const disabilities = [
    {
      type: "adhd" as DisabilityType,
      icon: Brain,
      title: "ADHD",
      description: "Visual-first learning with gamification and short modules",
    },
    {
      type: "dyslexia" as DisabilityType,
      icon: Type,
      title: "Dyslexic",
      description: "Dyslexia-friendly fonts and text-to-speech support",
    },
    {
      type: "hearing" as DisabilityType,
      icon: Ear,
      title: "Deaf/Hard of Hearing",
      description: "Visual communication tools and sign language support",
    },
    {
      type: "vision" as DisabilityType,
      icon: EyeOff,
      title: "Blind/Low Vision",
      description: "Screen reader compatible and high contrast mode",
    },
    {
      type: "none" as DisabilityType,
      icon: Eye,
      title: "None of the above",
      description: "Standard learning experience",
    },
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.disability) {
        toast.error("Please select your learning preference");
        return;
      }
      // Save to localStorage (mock authentication)
      localStorage.setItem("comrade_user", JSON.stringify(formData));
      // Ensure theme is applied with the saved disability
      updateDisability(formData.disability);
      toast.success("Account created successfully!");
      navigate("/onboarding");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" onClick={() => navigate("/")}>
            Help
          </Button>
        </div>

        <ProgressBar current={step} total={2} className="mb-8" />

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Create your account</h2>
              <p className="text-muted-foreground">
                Let's get you started on your learning journey
              </p>
            </div>

            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Choose your primary experience</h2>
              <p className="text-muted-foreground">
                This helps us customize the interface to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disabilities.map((disability) => (
                <DisabilityCard
                  key={disability.type}
                  icon={disability.icon}
                  title={disability.title}
                  description={disability.description}
                  selected={formData.disability === disability.type}
                  onClick={() => {
                    setFormData({ ...formData, disability: disability.type });
                    // Apply theme immediately when selected
                    updateDisability(disability.type);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-12">
          <Button variant="outline" size="lg" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button size="lg" onClick={handleNext}>
            {step === 2 ? "Complete Setup" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
