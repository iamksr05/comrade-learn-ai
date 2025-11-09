import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/Logo";
import { 
  ArrowLeft, 
  Bell, 
  BellOff, 
  Eye, 
  Volume2, 
  Type, 
  User, 
  Key, 
  LogOut,
  Settings as SettingsIcon,
  Sparkles
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, speakText } = useTheme();
  const { signOut, updateProfile } = useAuth();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = async () => {
    // Settings are already saved via updateSettings when toggled
    // Also sync with Supabase
    try {
      await updateProfile({ settings });
      toast.success("Settings saved successfully!");
      // Navigate back to dashboard after a short delay to show the toast
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Failed to save settings to cloud. Changes saved locally.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  };

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    updateSettings({ [key]: value });
    // Show immediate feedback for accessibility settings
    if (key === "highContrast" || key === "largerFont" || key === "textToSpeech") {
      const settingName = key === "highContrast" ? "High contrast mode" 
        : key === "largerFont" ? "Larger font size"
        : "Text-to-speech";
      toast.success(`${settingName} ${value ? "enabled" : "disabled"}`);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear any local data first
      localStorage.removeItem("allCourses");
      localStorage.removeItem("userData");
      
      // Sign out from Supabase - this will trigger auth state change
      await signOut();
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Navigate to home page after a brief delay to ensure state is cleared
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, clear local data and navigate
      localStorage.removeItem("allCourses");
      localStorage.removeItem("userData");
      toast.error("Error during logout, but you've been signed out");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");
      setChangePasswordOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <SettingsIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Settings</h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Manage your application preferences and accessibility settings
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {/* Notifications Section */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {settings.notifications ? (
                      <Bell className="w-5 h-5 text-primary" />
                    ) : (
                      <BellOff className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage how you receive alerts and updates
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="notifications" className="text-base font-medium cursor-pointer">
                        New Message Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive new messages
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("notifications", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="system-updates" className="text-base font-medium cursor-pointer">
                        System Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about system updates
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={settings.systemUpdates}
                    onCheckedChange={(checked) =>
                      handleSettingChange("systemUpdates", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Sidebar */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Account</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/profile")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Manage Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => setChangePasswordOpen(true)}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Separator className="my-3" />
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </CardContent>
            </Card>

            {/* Accessibility Features Section */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Accessibility Features</CardTitle>
                    <CardDescription>
                      Customize your experience for better accessibility
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {/* High Contrast Mode */}
                  <div className="flex flex-col p-5 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Eye className="w-5 h-5 text-primary" />
                        </div>
                        <Label htmlFor="high-contrast" className="text-base font-medium cursor-pointer">
                          High Contrast
                        </Label>
                      </div>
                      <Switch
                        id="high-contrast"
                        checked={settings.highContrast}
                        onCheckedChange={(checked) =>
                          handleSettingChange("highContrast", checked)
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>

                  {/* Text-to-Speech */}
                  <div className="flex flex-col p-5 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Volume2 className="w-5 h-5 text-primary" />
                        </div>
                        <Label htmlFor="text-to-speech" className="text-base font-medium cursor-pointer">
                          Text-to-Speech
                        </Label>
                      </div>
                      <Switch
                        id="text-to-speech"
                        checked={settings.textToSpeech}
                        onCheckedChange={(checked) =>
                          handleSettingChange("textToSpeech", checked)
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Hear text content read aloud
                    </p>
                    {settings.textToSpeech && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-auto"
                        onClick={() => speakText("Text-to-speech is working correctly. You can now hear text content read aloud.")}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Test Speech
                      </Button>
                    )}
                  </div>

                  {/* Larger Font */}
                  <div className="flex flex-col p-5 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Type className="w-5 h-5 text-primary" />
                        </div>
                        <Label htmlFor="larger-font" className="text-base font-medium cursor-pointer">
                          Larger Font
                        </Label>
                      </div>
                      <Switch
                        id="larger-font"
                        checked={settings.largerFont}
                        onCheckedChange={(checked) =>
                          handleSettingChange("largerFont", checked)
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Increase font size for better readability
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="min-w-[140px]">
              Save Changes
            </Button>
          </div>
        </div>
      </main>

      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
