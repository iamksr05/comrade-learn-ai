import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Check if user exists in localStorage
    const userData = localStorage.getItem("userData");
    if (!userData) {
      toast.error("No account found. Please sign up first.");
      setTimeout(() => {
        navigate("/signup");
      }, 1500);
      setIsLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      // Simple email check - in a real app, you'd verify the password properly
      // For now, just check if email matches (password verification would require hashing)
      if (parsed.email === formData.email) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Signed in successfully!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      toast.error("Failed to sign in. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <Button variant="ghost" onClick={() => navigate("/")}>
            Help
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

