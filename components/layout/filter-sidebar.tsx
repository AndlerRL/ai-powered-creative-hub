import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFilter } from '@/hooks/context/layout-filter';
import { CONTENT_TYPES, PHASES, PHASE_DESCRIPTIONS } from '@/lib/constants/data';
import { cn } from "@/lib/utils";
import React from 'react';

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  className,
}) => {
  const { selectedPhase, selectedTypes, setSelectedPhase, toggleType } = useFilter();

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Learning Phases
          </h2>
          <div className="space-y-1">
            {PHASES.map((phase) => (
              <button
                key={phase}
                onClick={() => setSelectedPhase(selectedPhase === phase ? null : phase)}
                className={cn(
                  "w-full flex items-center py-2 px-4 rounded-lg text-sm",
                  selectedPhase === phase
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                Phase {phase}
                <span className="ml-auto opacity-75 text-xs">
                  {PHASE_DESCRIPTIONS[phase]}
                </span>
              </button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Content Types
          </h2>
          <ScrollArea className="h-[300px] px-4">
            <div className="space-y-2">
              {CONTENT_TYPES.map((type) => {
                const isPremiumContent = type === 'Pro';
                return (
                  <div
                    key={type}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => {
                        if (isPremiumContent) {
                          return;
                        }
                        toggleType(type);
                      }}
                    />
                    <label
                      htmlFor={type}
                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                      {isPremiumContent && (
                        <Badge
                          variant="secondary"
                          className="ml-2"
                        >
                          PRO
                        </Badge>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;