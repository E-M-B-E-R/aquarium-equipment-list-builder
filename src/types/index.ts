export interface PriceSource {
  source: string;
  price: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'Tank' | 'Heater' | 'CO2 Equipment' | 'Environment' | 'Filter' | 'Lighting' | 'Water Treatment';
  modelNumber?: string;
  prices: PriceSource[];
  specifications?: string;
  quantity?: number;
}

export interface Fish {
  id: string;
  name: string;
  scientificName: string;
  type: 'Fish';
  quantity?: number;
  imageUrl?: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  type: 'Plant';
  quantity?: number;
  imageUrl?: string;
}

export interface AquariumBuild {
  id: string;
  title: string;
  description: string;
  equipment: Product[];
  fish: Fish[];
  plants: Plant[];
  isPublic: boolean;
  createdAt: string;
  author: string;
  photos: string[]; // Array of photo URLs/data URLs
}

export interface Comment {
  id: string;
  buildId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type SearchableItem = Product | Fish | Plant;