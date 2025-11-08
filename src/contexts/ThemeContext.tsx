import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DisabilityType } from "@/types/disability";

interface ThemeContextType {
  disability: DisabilityType;
  updateDisability: (disability: DisabilityType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [disability, setDisability] = useState<DisabilityType>("none");

  useEffect(() => {
    // Load user disability preference from localStorage
    const loadTheme = () => {
      const user = localStorage.getItem("comrade_user");
      if (user) {
        try {
          const userData = JSON.parse(user);
          const userDisability = userData?.disability || "none";
          setDisability(userDisability);
          applyTheme(userDisability);
        } catch (error) {
          console.error("Error loading user preferences:", error);
          applyTheme("none");
        }
      } else {
        applyTheme("none");
      }
    };

    loadTheme();

    // Listen for storage changes (in case user updates in another tab)
    window.addEventListener("storage", loadTheme);
    return () => window.removeEventListener("storage", loadTheme);
  }, []);

  const applyTheme = (disabilityType: DisabilityType) => {
    // Remove all disability theme classes
    document.documentElement.classList.remove(
      "theme-adhd",
      "theme-dyslexia",
      "theme-hearing",
      "theme-vision",
      "theme-none"
    );

    // Add the appropriate theme class
    document.documentElement.classList.add(`theme-${disabilityType}`);
    
    // Apply additional body classes for specific customizations
    document.body.classList.remove(
      "adhd-mode",
      "dyslexia-mode",
      "hearing-mode",
      "vision-mode"
    );

    switch (disabilityType) {
      case "adhd":
        document.body.classList.add("adhd-mode");
        break;
      case "dyslexia":
        document.body.classList.add("dyslexia-mode");
        break;
      case "hearing":
        document.body.classList.add("hearing-mode");
        break;
      case "vision":
        document.body.classList.add("vision-mode");
        break;
      default:
        break;
    }
  };

  const updateDisability = (newDisability: DisabilityType) => {
    setDisability(newDisability);
    applyTheme(newDisability);
    
    // Update localStorage
    const user = localStorage.getItem("comrade_user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        userData.disability = newDisability;
        localStorage.setItem("comrade_user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error updating user preferences:", error);
      }
    } else {
      // During signup, user might not exist yet, but we can still apply the theme
      // The theme will be saved when the user completes signup
      // For now, we store it in a temporary location or just apply it
      // The theme will persist in the session
    }
  };

  return (
    <ThemeContext.Provider value={{ disability, updateDisability }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

