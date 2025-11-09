import { DisabilityType } from "@/types/disability";

/**
 * Returns the external AI Companion URL based on the user's special ability type.
 * Returns null if the special ability should use the internal AI Companion.
 */
export const getAICompanionUrl = (disability: DisabilityType): string | null => {
  switch (disability) {
    case "adhd":
      return "https://info-genius-ai-kkkp.vercel.app/";
    case "dyslexia":
      return "https://ai-dyslexia.vercel.app/";
    default:
      return null; // For other special abilities (hearing, vision, none), use the internal AI Companion
  }
};

