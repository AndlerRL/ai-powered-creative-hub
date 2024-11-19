'use client'

import SessionGrid from "@/components/session-grid";
import { useFilter } from "@/hooks/context/layout-filter";
import { PHASE_DESCRIPTIONS, SESSIONS } from "@/lib/constants/data";

const Dashboard = () => {
  const { selectedPhase } = useFilter();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Learning Path</h1>
        <p className="text-gray-600">
          {selectedPhase
            ? `Phase ${selectedPhase}: ${PHASE_DESCRIPTIONS[selectedPhase]}`
            : 'All Phases'}
        </p>
      </div>

      <SessionGrid
        sessions={SESSIONS}
      />
    </>
  );
};

export default Dashboard;