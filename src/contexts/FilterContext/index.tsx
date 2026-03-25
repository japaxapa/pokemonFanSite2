import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the filter state interface
interface FilterState {
  selectedGeneration: number | null;
}

// Define the context type
interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Default filter state
const defaultFilters: FilterState = {
  selectedGeneration: null,
};

// Provider component
interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFiltersState] = useState<FilterState>(defaultFilters);

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  const value: FilterContextType = {
    filters,
    setFilters,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useADVFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
