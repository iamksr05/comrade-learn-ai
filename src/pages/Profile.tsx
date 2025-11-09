import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { DisabilityCard } from "@/components/DisabilityCard";
import { ArrowLeft, Eye, EyeOff, Ear, Brain, Type, User, Mail, Sparkles } from "lucide-react";
import { DisabilityType } from "@/types/disability";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { disability, updateDisability, speakText, settings } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    disability: "none" as DisabilityType,
  });

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setFormData({
          name: parsed.name || "",
          email: parsed.email || "",
          disability: (parsed.disability as DisabilityType) || disability || "none",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [disability]);

  const disabilities = [
    {
      type: "adhd" as DisabilityType,
      icon: Brain,
      title: "ADHD",
      description: "Visual-first learning tools",
    },
    {
      type: "dyslexia" as DisabilityType,
      icon: Type,
      title: "Dyslexic",
      description: "Dyslexia-friendly fonts",
    },
    {
      type: "hearing" as DisabilityType,
      icon: Ear,
      title: "Deaf/Hard of Hearing",
      description: "Visual communication",
    },
    {
      type: "vision" as DisabilityType,
      icon: EyeOff,
      title: "Low Vision",
      description: "Screen reader compatible",
    },
    {
      type: "none" as DisabilityType,
      icon: Eye,
      title: "None",
      description: "Standard experience",
    },
  ];

  const handleSave = async () => {
    // Validate form data
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSaving(true);
    
    // Update profile in localStorage
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      disability: formData.disability,
      settings: settings,
    };
    
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsSaving(false);

    // Update theme context
    updateDisability(formData.disability);
    
    toast.success("Profile updated successfully!");
    setIsEditing(false);
    
    if (settings.textToSpeech) {
      speakText("Profile updated successfully");
    }
  };

  const handleCancel = () => {
    // Reload original data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setFormData({
          name: parsed.name || "",
          email: parsed.email || "",
          disability: (parsed.disability as DisabilityType) || disability || "none",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setIsEditing(false);
  };

  const getDisabilityDisplayName = (type: DisabilityType) => {
    const option = disabilities.find((d) => d.type === type);
    return option ? option.title : "None";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Profile</h1>
            <p className="text-lg text-muted-foreground">
              View and manage your account information
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{formData.name || "User"}</h2>
                  <p className="text-muted-foreground">{formData.email || "No email"}</p>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-lg">{formData.name || "Not set"}</p>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-lg">{formData.email || "Not set"}</p>
                  </div>
                )}
              </div>

              {/* Special Ability Field */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Special Ability
                </Label>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {disabilities.map((disabilityOption) => (
                      <DisabilityCard
                        key={disabilityOption.type}
                        icon={disabilityOption.icon}
                        title={disabilityOption.title}
                        description={disabilityOption.description}
                        selected={formData.disability === disabilityOption.type}
                        onClick={() => {
                          setFormData({ ...formData, disability: disabilityOption.type });
                          // Preview theme change immediately
                          updateDisability(disabilityOption.type);
                          toast.success(`${disabilityOption.title} mode preview activated!`);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-lg">{getDisabilityDisplayName(formData.disability)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {disabilities.find((d) => d.type === formData.disability)?.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
              </div>
            </div>
          </Card>

          {/* Additional Actions */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/settings")}>
                Go to Settings
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;

