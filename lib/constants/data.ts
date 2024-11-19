import { ContentType, Session } from "@/lib/types";

export const CONTENT_TYPES: ContentType[] = [
  "Prompt Engineering",
  "Machine Learning",
  "LLMs",
  "AI-Driven Development",
  "Examples",
  "Documentation",
];

export const PHASES = [1, 2, 3, 4] as const;

export const PHASE_DESCRIPTIONS = {
  1: "Introduction to AI Fundamentals",
  2: "Advanced Concepts and Applications",
  3: "Building AI-Powered Solutions",
  4: "Master Class and Real-World Projects",
} as const;

export const SESSIONS: Session[] = [
  {
    id: 1,
    title: "Introduction to AI Concepts",
    description: "Learn the fundamental concepts of AI and machine learning.",
    duration: "30 mins",
    phase: 1,
    contentType: ["Machine Learning", "Documentation"],
    isPremium: false,
    markdown: "# Welcome to AI Fundamentals\n\nIn this session, we'll cover...",
  },
  {
    id: 2,
    title: "Advanced Prompt Engineering",
    description: "Master the art of crafting effective prompts for AI models.",
    duration: "45 mins",
    phase: 2,
    contentType: ["Prompt Engineering", "Examples"],
    isPremium: false,
  },
  {
    id: 3,
    title: "PRO MODE: Building AI-Powered Apps",
    description: "Hands-on workshop building real AI applications.",
    duration: "60 mins",
    phase: 3,
    contentType: ["Pro", "AI-Driven Development"],
    isPremium: true,
  },
  // Add more sessions as needed
];
