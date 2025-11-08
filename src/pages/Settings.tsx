import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/Logo";
import { DisabilityCard } from "@/components/DisabilityCard";
import { ArrowLeft, Eye, EyeOff, Ear, Brain, Type } from "lucide-react";
import { DisabilityType } from "@/types/disability";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [userData] = useState(() => {
    const user = localStorage.getItem("comrade_user");
    return user ? JSON.parse(user) : null;
  });

  const [selectedDisability, setSelectedDisability] = useState<DisabilityType>(
    userData?.disability || "none"
  );
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
    // Update user data in localStorage
    if (userData) {
      const updatedUser = { ...userData, disability: selectedDisability };
      localStorage.setItem("comrade_user", JSON.stringify(updatedUser));
    }
    toast.success("Settings saved successfully!");
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
                {disabilities.map((disability) => (
                  <DisabilityCard
                    key={disability.type}
                    icon={disability.icon}
                    title={disability.title}
                    description={disability.description}
                    selected={selectedDisability === disability.type}
                    onClick={() => setSelectedDisability(disability.type)}
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
