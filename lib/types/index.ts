export type ContentType =
  | "Prompt Engineering"
  | "Machine Learning"
  | "LLMs"
  | "AI-Driven Development"
  | "Examples"
  | "Documentation"
  | "Pro";

export type Phase = 1 | 2 | 3 | 4;

export type Session = {
  id: number;
  title: string;
  description: string;
  duration: string;
  phase: Phase;
  contentType: ContentType[];
  isPremium: boolean;
  markdown?: string; // Optional markdown content
};
