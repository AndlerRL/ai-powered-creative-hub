'use client'

import { ContentType, Phase } from '@/lib/types';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface FilterContextType {
  selectedPhase: Phase | null;
  selectedTypes: ContentType[];
  setSelectedPhase: (phase: Phase | null) => void;
  setSelectedTypes: (types: ContentType[]) => void;
  toggleType: (type: ContentType) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([]);

  const toggleType = useCallback((type: ContentType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedPhase(null);
    setSelectedTypes([]);
  }, []);

  const value = {
    selectedPhase,
    selectedTypes,
    setSelectedPhase,
    setSelectedTypes,
    toggleType,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}