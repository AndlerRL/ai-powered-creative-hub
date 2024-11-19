import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Session } from '@/lib/types';
import { ArrowRight, BookOpen, Clock, Lock } from "lucide-react";
import Link from 'next/link';
import React from 'react';

interface SessionCardProps {
  session: Session;
}

const getSessionThumbnail = (sessionId: number, title: string) => {
  const seed = `session-${sessionId}-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=b6e3f4`;
};

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  return (
    <Card className="flex flex-col">
      <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          src={getSessionThumbnail(session.id, session.title)}
          alt={`${session.title} thumbnail`}
          className="w-full h-full object-cover"
        />
        {session.isPremium && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Pro Content</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {session.contentType.map(type => (
            <Badge
              key={type}
              variant={type === 'Pro' ? 'default' : 'secondary'}
            >
              {type}
            </Badge>
          ))}
        </div>
        <CardTitle>{session.title}</CardTitle>
        <CardDescription>{session.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center text-sm text-gray-600">
        <Clock className="w-4 h-4 mr-2" />
        <span>{session.duration}</span>
        <BookOpen className="w-4 h-4 ml-4 mr-2" />
        <span>Phase {session.phase}</span>
      </CardContent>

      <CardFooter className="mt-auto">
        {(!session.isPremium) ? (
          <Link href={`/session/${session.id}`} className="w-full">
            <Button className="w-full">
              Start Session
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Button className="w-full" variant="secondary" disabled>
            <Lock className="w-4 h-4 mr-2" />
            Premium Content
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SessionCard;