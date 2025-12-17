import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AquariumBuild, Product, Fish, Plant } from '../types';

interface BuildContextType {
  currentBuild: AquariumBuild;
  updateBuild: (updates: Partial<AquariumBuild>) => void;
  addEquipment: (product: Product, quantity: number) => void;
  removeEquipment: (productId: string) => void;
  addFish: (fish: Fish, quantity: number) => void;
  removeFish: (fishId: string) => void;
  addPlant: (plant: Plant, quantity: number) => void;
  removePlant: (plantId: string) => void;
  resetBuild: () => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

const defaultBuild: AquariumBuild = {
  id: 'build-draft',
  title: 'My Aquarium Build',
  description: '',
  equipment: [],
  fish: [],
  plants: [],
  isPublic: false,
  createdAt: new Date().toISOString(),
  author: 'CurrentUser',
  photos: []
};

export function BuildProvider({ children }: { children: ReactNode }) {
  const [currentBuild, setCurrentBuild] = useState<AquariumBuild>(() => {
    const saved = localStorage.getItem('currentBuild');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure backward compatibility by adding missing fields
      return {
        ...defaultBuild,
        ...parsed,
        photos: parsed.photos || []
      };
    }
    return defaultBuild;
  });

  useEffect(() => {
    localStorage.setItem('currentBuild', JSON.stringify(currentBuild));
  }, [currentBuild]);

  const updateBuild = (updates: Partial<AquariumBuild>) => {
    setCurrentBuild(prev => ({ ...prev, ...updates }));
  };

  const addEquipment = (product: Product, quantity: number) => {
    setCurrentBuild(prev => {
      const exists = prev.equipment.find(e => e.id === product.id);
      if (exists) return prev;
      return { ...prev, equipment: [...prev.equipment, { ...product, quantity }] };
    });
  };

  const removeEquipment = (productId: string) => {
    setCurrentBuild(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e.id !== productId)
    }));
  };

  const addFish = (fish: Fish, quantity: number) => {
    setCurrentBuild(prev => {
      const existing = prev.fish.find(f => f.id === fish.id);
      if (existing) {
        return {
          ...prev,
          fish: prev.fish.map(f => 
            f.id === fish.id ? { ...f, quantity: (f.quantity || 0) + quantity } : f
          )
        };
      }
      return { ...prev, fish: [...prev.fish, { ...fish, quantity }] };
    });
  };

  const removeFish = (fishId: string) => {
    setCurrentBuild(prev => ({
      ...prev,
      fish: prev.fish.filter(f => f.id !== fishId)
    }));
  };

  const addPlant = (plant: Plant, quantity: number) => {
    setCurrentBuild(prev => {
      const existing = prev.plants.find(p => p.id === plant.id);
      if (existing) {
        return {
          ...prev,
          plants: prev.plants.map(p => 
            p.id === plant.id ? { ...p, quantity: (p.quantity || 0) + quantity } : p
          )
        };
      }
      return { ...prev, plants: [...prev.plants, { ...plant, quantity }] };
    });
  };

  const removePlant = (plantId: string) => {
    setCurrentBuild(prev => ({
      ...prev,
      plants: prev.plants.filter(p => p.id !== plantId)
    }));
  };

  const resetBuild = () => {
    setCurrentBuild(defaultBuild);
    localStorage.removeItem('currentBuild');
  };

  return (
    <BuildContext.Provider
      value={{
        currentBuild,
        updateBuild,
        addEquipment,
        removeEquipment,
        addFish,
        removeFish,
        addPlant,
        removePlant,
        resetBuild
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error('useBuild must be used within a BuildProvider');
  }
  return context;
}