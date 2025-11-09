import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DisabilityType } from "@/types/disability";

export interface AppSettings {
  notifications: boolean;
  systemUpdates: boolean;
  highContrast: boolean;
  textToSpeech: boolean;
  largerFont: boolean;
}

interface ThemeContextType {
  disability: DisabilityType;
  settings: AppSettings;
  updateDisability: (disability: DisabilityType) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  speakText: (text: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultSettings: AppSettings = {
  notifications: true,
  systemUpdates: false,
  highContrast: false,
  textToSpeech: false,
  largerFont: false,
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [disability, setDisability] = useState<DisabilityType>("none");
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Define applyTheme and applySettings functions
  const applyTheme = React.useCallback((disabilityType: DisabilityType) => {
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
  }, []);

  const applySettings = React.useCallback((appSettings: AppSettings) => {
    // Apply high contrast mode
    if (appSettings.highContrast) {
      document.documentElement.classList.add("high-contrast-mode");
    } else {
      document.documentElement.classList.remove("high-contrast-mode");
    }

    // Apply larger font mode
    if (appSettings.largerFont) {
      document.documentElement.classList.add("larger-font-mode");
    } else {
      document.documentElement.classList.remove("larger-font-mode");
    }
  }, []);

  // Load preferences from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const userDisability = (parsed.disability as DisabilityType) || "none";
        const userSettings = parsed.settings || defaultSettings;
        
        setDisability(userDisability);
        setSettings(userSettings);
        applyTheme(userDisability);
        applySettings(userSettings);
      } catch (error) {
        console.error("Error loading user preferences:", error);
        applyTheme("none");
        applySettings(defaultSettings);
      }
    } else {
      // No user data, use defaults
      applyTheme("none");
      applySettings(defaultSettings);
    }
  }, [applyTheme, applySettings]);


  const updateDisability = (newDisability: DisabilityType) => {
    setDisability(newDisability);
    applyTheme(newDisability);
    
    // Update localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        parsed.disability = newDisability;
        localStorage.setItem("userData", JSON.stringify(parsed));
      } catch (error) {
        console.error("Error updating disability:", error);
      }
    }
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    applySettings(updatedSettings);
    
    // Update localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        parsed.settings = updatedSettings;
        localStorage.setItem("userData", JSON.stringify(parsed));
      } catch (error) {
        console.error("Error updating settings:", error);
      }
    }
  };

  const speakText = React.useCallback((text: string) => {
    if (!settings.textToSpeech) {
      return;
    }

    const synth = speechSynthesis || (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);
    if (!synth) {
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Function to set voice (voices might not be loaded immediately)
    const setVoice = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(
          (voice) => voice.name.includes("Google") || voice.name.includes("Natural")
        ) || voices.find((voice) => voice.lang.startsWith("en"));
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }
      synth.speak(utterance);
    };

    // Try to get voices immediately
    const voices = synth.getVoices();
    if (voices.length > 0) {
      setVoice();
    } else {
      // Wait for voices to load
      synth.onvoiceschanged = () => {
        setVoice();
        synth.onvoiceschanged = null;
      };
      // Fallback: speak after a short delay even if voices haven't loaded
      setTimeout(() => {
        if (synth.getVoices().length === 0) {
          synth.speak(utterance);
        }
      }, 100);
    }
  }, [settings.textToSpeech, speechSynthesis]);


  return (
    <ThemeContext.Provider value={{ disability, settings, updateDisability, updateSettings, speakText }}>
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

