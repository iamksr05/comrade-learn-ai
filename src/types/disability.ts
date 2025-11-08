export type DisabilityType = "adhd" | "dyslexia" | "hearing" | "vision" | "none";

export interface UserPreferences {
  disability: DisabilityType;
  textPreference: "simple" | "standard" | "detailed";
  highContrast: boolean;
  textToSpeech: boolean;
  largerFont: boolean;
  simplifiedText: boolean;
}

export interface Course {
  id: string;
  language: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  modules: CourseModule[];
  progress: number;
}

export interface CourseModule {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  content: string;
}
