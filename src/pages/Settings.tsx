import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/Logo";
import { DisabilityCard } from "@/components/DisabilityCard";
import { ArrowLeft, Eye, EyeOff, Ear, Brain, Type } from "lucide-react";
import { DisabilityType } from "@/types/disability";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { disability, updateDisability } = useTheme();
  const [userData] = useState(() => {
    const user = localStorage.getItem("comrade_user");
    return user ? JSON.parse(user) : null;
  });

  const [selectedDisability, setSelectedDisability] = useState<DisabilityType>(
    disability || userData?.disability || "none"
  );

  // Sync with theme context when it changes
  useEffect(() => {
    if (disability) {
      setSelectedDisability(disability);
    }
  }, [disability]);
  const [settings, setSettings] = useState({
    notifications: true,
    systemUpdates: false,
    highContrast: false,
    textToSpeech: false,
    largerFont: false,
  });

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
      title: "Blind/Low Vision",
      description: "Screen reader compatible",
    },
    {
      type: "none" as DisabilityType,
      icon: Eye,
      title: "None",
      description: "Standard experience",
    },
  ];

  const handleSave = () => {
    // Update theme (which also updates localStorage)
    updateDisability(selectedDisability);
    toast.success("Settings saved successfully! Theme updated.");
  };

  const handleLogout = () => {
    localStorage.removeItem("comrade_user");
    toast.success("Logged out successfully");
    navigate("/");
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
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-lg text-muted-foreground">
              Manage your communication mode and application settings
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Choose Your Primary Experience</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {disabilities.map((disabilityOption) => (
                  <DisabilityCard
                    key={disabilityOption.type}
                    icon={disabilityOption.icon}
                    title={disabilityOption.title}
                    description={disabilityOption.description}
                    selected={selectedDisability === disabilityOption.type}
                    onClick={() => {
                      setSelectedDisability(disabilityOption.type);
                      // Apply theme immediately when selected
                      updateDisability(disabilityOption.type);
                      toast.success(`${disabilityOption.title} mode activated!`);
                    }}
                  />
                ))}
              </div>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">General Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">New Message Alerts</Label>
                      <Switch
                        id="notifications"
                        checked={settings.notifications}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, notifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <Switch
                        id="system-updates"
                        checked={settings.systemUpdates}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, systemUpdates: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Accessibility Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-contrast">High Contrast Mode</Label>
                      <Switch
                        id="high-contrast"
                        checked={settings.highContrast}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, highContrast: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="text-to-speech">Text-to-Speech</Label>
                      <Switch
                        id="text-to-speech"
                        checked={settings.textToSpeech}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, textToSpeech: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="larger-font">Larger Font Size</Label>
                      <Switch
                        id="larger-font"
                        checked={settings.largerFont}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, largerFont: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3">Account Management</h4>
                  <div className="flex gap-3">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="destructive" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
