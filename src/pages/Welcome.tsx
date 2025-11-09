import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <div className="p-6 bg-primary/10 rounded-full">
            <Sparkles className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to Comrade
          </h1>
          <p className="text-lg text-muted-foreground">
            Personalized learning designed for everyone
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-full"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
