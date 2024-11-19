'use client'

import FlappyBird from "@/components/phase1/session1/flappy-bird";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilter } from "@/hooks/context/layout-filter";
import { Phase } from "@/lib/types";
import { ArrowLeft, ExternalLinkIcon } from "lucide-react";
import Link from 'next/link';
import { useEffect } from "react";

// This would typically come from your database/API
const getLessonContent = (id: string) => {
  const lessons = {
    "1": {
      title: "Introduction to React Hooks",
      description: "Learn the basics of React Hooks and how to use them effectively in your applications.",
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="inline-block">
            Original source: <a className="inline-flex text-blue-500 hover:text-blue-600" href="https://codesandbox.io/p/devbox/flappy-bird-ai-gen-rwgmft">codesandbox <ExternalLinkIcon size={8} /> </a></h2>
          <FlappyBird />
        </div>
      )
    },
    "2": {
      title: "Advanced State Management",
      description: "Deep dive into complex state management patterns using React's built-in hooks.",
      content: <p>useReducer Hook Example Component</p>
    },
    "3": {
      title: "Building Custom Hooks",
      description: "Create reusable custom hooks to share logic between components.",
      content: <p>Custom Hook Example Component</p>
    }
  };
  return lessons[id as keyof typeof lessons];
};

const LessonComponent = ({ params }: { params: { id: string } }) => {
  const { setSelectedPhase } = useFilter();
  const lesson = getLessonContent(params.id);

  useEffect(() => {
    if (params.id) {
      setSelectedPhase(Number(params.id) as Phase)
    }

    return () => {
      setSelectedPhase(null)
    }
  }, [params])

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="py-8">
            <h1 className="text-2xl font-bold text-center">Lesson not found</h1>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {/* This is where you would render the actual lesson content/component */}
          <div className="p-4 border rounded-lg bg-slate-50">
            <h2 className="text-lg font-semibold mb-4">Lesson Content</h2>
            {lesson.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonComponent;
