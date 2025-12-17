import { Product, Fish, Plant, Comment } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'tank-1',
    name: 'Fluval Flex Aquarium 15 Gallon',
    type: 'Tank',
    modelNumber: 'FL15',
    prices: [
      { source: 'Amazon', price: 129.99, url: '#' },
      { source: 'Petsmart', price: 139.99, url: '#' },
      { source: 'Aquarium Co-op', price: 134.99, url: '#' }
    ],
    specifications: '15 gallon, 16" x 15" x 15.5"'
  },
  {
    id: 'tank-2',
    name: 'Waterbox Clear 10 Gallon',
    type: 'Tank',
    modelNumber: 'WB10C',
    prices: [
      { source: 'Amazon', price: 189.99, url: '#' },
      { source: 'Petsmart', price: 199.99, url: '#' },
      { source: 'Aquarium Co-op', price: 184.99, url: '#' }
    ],
    specifications: '10 gallon rimless, ultra-clear glass'
  },
  {
    id: 'tank-3',
    name: 'Aqueon Standard 20 Gallon',
    type: 'Tank',
    modelNumber: 'AQ20H',
    prices: [
      { source: 'Amazon', price: 49.99, url: '#' },
      { source: 'Petsmart', price: 54.99, url: '#' },
      { source: 'Aquarium Co-op', price: 47.99, url: '#' }
    ],
    specifications: '20 gallon, 24" x 12" x 16"'
  },
  {
    id: 'heater-1',
    name: 'Eheim Jager 100W Heater',
    type: 'Heater',
    modelNumber: 'EJ100',
    prices: [
      { source: 'Amazon', price: 34.99, url: '#' },
      { source: 'Petsmart', price: 39.99, url: '#' },
      { source: 'Aquarium Co-op', price: 36.99, url: '#' }
    ],
    specifications: '100W, suitable for 20-30 gallon tanks'
  },
  {
    id: 'heater-2',
    name: 'Fluval E200 Electronic Heater',
    type: 'Heater',
    modelNumber: 'FE200',
    prices: [
      { source: 'Amazon', price: 54.99, url: '#' },
      { source: 'Petsmart', price: 59.99, url: '#' },
      { source: 'Aquarium Co-op', price: 56.99, url: '#' }
    ],
    specifications: '200W with LCD display'
  },
  {
    id: 'co2-1',
    name: 'CO2Art Pro-Elite Regulator',
    type: 'CO2 Equipment',
    modelNumber: 'CO2PE',
    prices: [
      { source: 'Amazon', price: 169.99, url: '#' },
      { source: 'Petsmart', price: 179.99, url: '#' },
      { source: 'Aquarium Co-op', price: 174.99, url: '#' }
    ],
    specifications: 'Dual stage regulator with solenoid'
  },
  {
    id: 'co2-2',
    name: 'Fluval Mini CO2 Kit',
    type: 'CO2 Equipment',
    modelNumber: 'FCO2M',
    prices: [
      { source: 'Amazon', price: 49.99, url: '#' },
      { source: 'Petsmart', price: 54.99, url: '#' },
      { source: 'Aquarium Co-op', price: 52.99, url: '#' }
    ],
    specifications: 'Compact system for small tanks'
  },
  {
    id: 'soil-1',
    name: 'ADA Aqua Soil Amazonia',
    type: 'Environment',
    modelNumber: 'ADA-AS9',
    prices: [
      { source: 'Amazon', price: 39.99, url: '#' },
      { source: 'Petsmart', price: 44.99, url: '#' },
      { source: 'Aquarium Co-op', price: 42.99, url: '#' }
    ],
    specifications: '9L bag, planted tank substrate'
  },
  {
    id: 'soil-2',
    name: 'Fluval Plant and Shrimp Stratum',
    type: 'Environment',
    modelNumber: 'FPS-8L',
    prices: [
      { source: 'Amazon', price: 24.99, url: '#' },
      { source: 'Petsmart', price: 27.99, url: '#' },
      { source: 'Aquarium Co-op', price: 26.99, url: '#' }
    ],
    specifications: '8.8 lbs, volcanic soil'
  },
  {
    id: 'rock-1',
    name: 'Seiryu Stone (per lb)',
    type: 'Environment',
    prices: [
      { source: 'Amazon', price: 4.99, url: '#' },
      { source: 'Petsmart', price: 5.99, url: '#' },
      { source: 'Aquarium Co-op', price: 4.49, url: '#' }
    ],
    specifications: 'Natural gray stone with white veining'
  },
  {
    id: 'wood-1',
    name: 'Manzanita Driftwood Medium',
    type: 'Environment',
    prices: [
      { source: 'Amazon', price: 19.99, url: '#' },
      { source: 'Petsmart', price: 24.99, url: '#' },
      { source: 'Aquarium Co-op', price: 22.99, url: '#' }
    ],
    specifications: '12-16 inch pieces'
  },
  {
    id: 'filter-1',
    name: 'Fluval 307 Canister Filter',
    type: 'Filter',
    modelNumber: 'F307',
    prices: [
      { source: 'Amazon', price: 179.99, url: '#' },
      { source: 'Petsmart', price: 189.99, url: '#' },
      { source: 'Aquarium Co-op', price: 184.99, url: '#' }
    ],
    specifications: 'Up to 70 gallon capacity'
  },
  {
    id: 'filter-2',
    name: 'AquaClear 50 Power Filter',
    type: 'Filter',
    modelNumber: 'AC50',
    prices: [
      { source: 'Amazon', price: 44.99, url: '#' },
      { source: 'Petsmart', price: 49.99, url: '#' },
      { source: 'Aquarium Co-op', price: 47.99, url: '#' }
    ],
    specifications: 'For tanks 20-50 gallons'
  },
  {
    id: 'light-1',
    name: 'Fluval Plant 3.0 LED',
    type: 'Lighting',
    modelNumber: 'FP3-24',
    prices: [
      { source: 'Amazon', price: 159.99, url: '#' },
      { source: 'Petsmart', price: 169.99, url: '#' },
      { source: 'Aquarium Co-op', price: 164.99, url: '#' }
    ],
    specifications: '24-34 inch, Bluetooth controlled'
  },
  {
    id: 'light-2',
    name: 'Nicrew ClassicLED Plus',
    type: 'Lighting',
    modelNumber: 'NC-P20',
    prices: [
      { source: 'Amazon', price: 39.99, url: '#' },
      { source: 'Petsmart', price: 44.99, url: '#' },
      { source: 'Aquarium Co-op', price: 42.99, url: '#' }
    ],
    specifications: '20-27 inch, full spectrum'
  },
  {
    id: 'treatment-1',
    name: 'Seachem Prime Water Conditioner',
    type: 'Water Treatment',
    modelNumber: 'SC-500',
    prices: [
      { source: 'Amazon', price: 16.99, url: '#' },
      { source: 'Petsmart', price: 18.99, url: '#' },
      { source: 'Aquarium Co-op', price: 17.99, url: '#' }
    ],
    specifications: '500ml bottle'
  },
  {
    id: 'treatment-2',
    name: 'API Stress Coat',
    type: 'Water Treatment',
    modelNumber: 'API-SC16',
    prices: [
      { source: 'Amazon', price: 12.99, url: '#' },
      { source: 'Petsmart', price: 14.99, url: '#' },
      { source: 'Aquarium Co-op', price: 13.99, url: '#' }
    ],
    specifications: '16oz bottle'
  }
];

export const mockFish: Fish[] = [
  {
    id: 'fish-1',
    name: 'Neon Tetra',
    scientificName: 'Paracheirodon innesi',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1737688670910-084f54254e73?w=400'
  },
  {
    id: 'fish-2',
    name: 'Cardinal Tetra',
    scientificName: 'Paracheirodon axelrodi',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1737688670910-084f54254e73?w=400'
  },
  {
    id: 'fish-3',
    name: 'Cherry Shrimp',
    scientificName: 'Neocaridina davidi',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1676825910862-8ab5b59c4ed1?w=400'
  },
  {
    id: 'fish-4',
    name: 'Corydoras Paleatus',
    scientificName: 'Corydoras paleatus',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1730530355813-fdfb30480141?w=400'
  },
  {
    id: 'fish-5',
    name: 'Betta Fish',
    scientificName: 'Betta splendens',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1706479980962-23942d2f4d56?w=400'
  },
  {
    id: 'fish-6',
    name: 'Angelfish',
    scientificName: 'Pterophyllum scalare',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1558443697-7677b4b69573?w=400'
  },
  {
    id: 'fish-7',
    name: 'Dwarf Gourami',
    scientificName: 'Trichogaster lalius',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1706479980962-23942d2f4d56?w=400'
  },
  {
    id: 'fish-8',
    name: 'Amano Shrimp',
    scientificName: 'Caridina multidentata',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1676825910862-8ab5b59c4ed1?w=400'
  },
  {
    id: 'fish-9',
    name: 'Otocinclus Catfish',
    scientificName: 'Otocinclus vittatus',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1730530355813-fdfb30480141?w=400'
  },
  {
    id: 'fish-10',
    name: 'Zebra Danio',
    scientificName: 'Danio rerio',
    type: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1737688670910-084f54254e73?w=400'
  }
];

export const mockPlants: Plant[] = [
  {
    id: 'plant-1',
    name: 'Java Fern',
    scientificName: 'Microsorum pteropus',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664557585535-8f12aad45c0c?w=400'
  },
  {
    id: 'plant-2',
    name: 'Anubias Nana',
    scientificName: 'Anubias barteri var. nana',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1691681122735-41c522ef82aa?w=400'
  },
  {
    id: 'plant-3',
    name: 'Amazon Sword',
    scientificName: 'Echinodorus amazonicus',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664438937392-d76e574d83f7?w=400'
  },
  {
    id: 'plant-4',
    name: 'Java Moss',
    scientificName: 'Taxiphyllum barbieri',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664557585535-8f12aad45c0c?w=400'
  },
  {
    id: 'plant-5',
    name: 'Rotala Rotundifolia',
    scientificName: 'Rotala rotundifolia',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664438937392-d76e574d83f7?w=400'
  },
  {
    id: 'plant-6',
    name: 'Cryptocoryne Wendtii',
    scientificName: 'Cryptocoryne wendtii',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1691681122735-41c522ef82aa?w=400'
  },
  {
    id: 'plant-7',
    name: 'Monte Carlo',
    scientificName: 'Micranthemum tweediei',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664438937392-d76e574d83f7?w=400'
  },
  {
    id: 'plant-8',
    name: 'Dwarf Hairgrass',
    scientificName: 'Eleocharis parvula',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664438937392-d76e574d83f7?w=400'
  },
  {
    id: 'plant-9',
    name: 'Water Wisteria',
    scientificName: 'Hygrophila difformis',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664557585535-8f12aad45c0c?w=400'
  },
  {
    id: 'plant-10',
    name: 'Vallisneria',
    scientificName: 'Vallisneria spiralis',
    type: 'Plant',
    imageUrl: 'https://images.unsplash.com/photo-1664438937392-d76e574d83f7?w=400'
  }
];

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    buildId: 'build-1',
    author: 'AquaEnthusiast42',
    content: 'Beautiful setup! How long have you been running this tank? The plants look very healthy.',
    createdAt: '2025-12-15T10:30:00Z'
  },
  {
    id: 'comment-2',
    buildId: 'build-1',
    author: 'TankMaster99',
    content: 'Great choice on the CO2 system. I use the same regulator and it\'s been rock solid for 2 years.',
    createdAt: '2025-12-16T14:22:00Z'
  },
  {
    id: 'comment-3',
    buildId: 'build-1',
    author: 'PlantedTankGuru',
    content: 'Have you considered adding more hardscape? Some Seiryu stone would complement the driftwood nicely.',
    createdAt: '2025-12-16T18:45:00Z'
  }
];