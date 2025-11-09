import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const ClerkWelcome = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

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
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full"
            >
              Get Started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full"
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default ClerkWelcome;

