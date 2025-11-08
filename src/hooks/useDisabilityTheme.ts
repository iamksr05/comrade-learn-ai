import { useEffect, useState } from "react";
import { DisabilityType } from "@/types/disability";

/**
 * Hook to manage disability-based theme customization
 * Applies CSS classes and styles based on user's disability preference
 */
export function useDisabilityTheme() {
  const [disability, setDisability] = useState<DisabilityType>("none");

  useEffect(() => {
    // Load user disability preference from localStorage
    const user = localStorage.getItem("comrade_user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        const userDisability = userData?.disability || "none";
        setDisability(userDisability);
        applyTheme(userDisability);
      } catch (error) {
        console.error("Error loading user preferences:", error);
      }
    } else {
      applyTheme("none");
    }
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

  const updateTheme = (newDisability: DisabilityType) => {
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
    }
  };

  return { disability, updateTheme };
}

