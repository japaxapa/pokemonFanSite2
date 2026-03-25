import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the filter state interface
interface FilterState {
  selectedGeneration: number | null;
  favorites: { id: number; name: string }[];
}

// Define the context type
interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  addToFavorites: (pokemon: { id: number; name: string }) => void;
  removeFromFavorites: (id: number) => void;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Default filter state
const defaultFilters: FilterState = {
  selectedGeneration: null,
  favorites: [],
};

// Provider component
interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const loadFavorites = () => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const [filters, setFiltersState] = useState<FilterState>({
    ...defaultFilters,
    favorites: loadFavorites(),
  });

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  const saveFavorites = (nextFavorites: { id: number; name: string }[]) => {
    localStorage.setItem('favorites', JSON.stringify(nextFavorites));
    setFilters({ favorites: nextFavorites });
  };

  const addToFavorites = (pokemon: { id: number; name: string }) => {
    const { favorites } = filters;
    if (!favorites.some(f => f.id === pokemon.id)) {
      const next = [...favorites, pokemon];
      saveFavorites(next);
    }
  };

  const removeFromFavorites = (id: number) => {
    const next = filters.favorites.filter(item => item.id !== id);
    saveFavorites(next);
  };

  const value: FilterContextType = {
    filters,
    setFilters,
    resetFilters,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

// Custom hook to use the filter context
export const useADVFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
