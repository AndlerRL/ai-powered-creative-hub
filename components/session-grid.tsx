import SessionCard from "@/components/session-card";
import { useFilter } from "@/hooks/context/layout-filter";
import { Session } from "@/lib/types";


interface SessionGridProps {
  sessions: Session[];
}

const SessionGrid: React.FC<SessionGridProps> = ({ sessions }) => {
  const { selectedPhase, selectedTypes } = useFilter();

  const filteredSessions = sessions.filter(session => {
    const phaseMatch = selectedPhase === null || session.phase === selectedPhase;
    const typeMatch = selectedTypes.length === 0 ||
      session.contentType.some(type => selectedTypes.includes(type));
    const accessMatch = !session.isPremium;

    return phaseMatch && typeMatch && accessMatch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSessions.map(session => (
        <SessionCard
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
};

export default SessionGrid;