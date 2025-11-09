import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SimpleProtectedRoute } from "@/components/SimpleProtectedRoute";
import Welcome from "./pages/Welcome";
import ClerkWelcome from "./components/ClerkWelcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Hub from "./pages/Hub";
import CourseGenerator from "./pages/CourseGenerator";
import LearningModule from "./pages/LearningModule";
import AICompanion from "./pages/AICompanion";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Get Clerk publishable key from environment variables
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Determine which route wrapper to use
const RouteWrapper = clerkPublishableKey ? ProtectedRoute : SimpleProtectedRoute;
const WelcomeComponent = clerkPublishableKey ? ClerkWelcome : Welcome;

const App = () => {
  // If Clerk key is missing, render app without Clerk (for development/testing)
  if (!clerkPublishableKey) {
    console.warn("⚠️ Missing Clerk Publishable Key. App will run without authentication.");
    console.warn("Add VITE_CLERK_PUBLISHABLE_KEY to your .env file to enable authentication.");
  }

  const appContent = (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WelcomeComponent />} />
              {!clerkPublishableKey && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </>
              )}
              <Route 
                path="/onboarding" 
                element={
                  <RouteWrapper>
                    <Onboarding />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <RouteWrapper>
                    <Dashboard />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/hub" 
                element={
                  <RouteWrapper>
                    <Hub />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/course-generator" 
                element={
                  <RouteWrapper>
                    <CourseGenerator />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/learning/:id" 
                element={
                  <RouteWrapper>
                    <LearningModule />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/ai-companion" 
                element={
                  <RouteWrapper>
                    <AICompanion />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <RouteWrapper>
                    <Settings />
                  </RouteWrapper>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <RouteWrapper>
                    <Profile />
                  </RouteWrapper>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );

  // Wrap with ClerkProvider only if key is available
  if (clerkPublishableKey) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        {appContent}
      </ClerkProvider>
    );
  }

  return appContent;
};

export default App;
