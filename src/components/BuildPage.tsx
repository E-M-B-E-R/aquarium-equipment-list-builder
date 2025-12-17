import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, X } from 'lucide-react';
import { useBuild } from '../context/BuildContext';
import { mockProducts, mockFish, mockPlants } from '../data/mockData';
import { Product, Fish, Plant } from '../types';

export function BuildPage() {
  const {
    currentBuild,
    addEquipment,
    removeEquipment,
    addFish,
    removeFish,
    addPlant,
    removePlant
  } = useBuild();

  const [searchTab, setSearchTab] = useState<'equipment' | 'livestock'>('equipment');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>({});

  // Equipment types for filtering
  const equipmentTypes = ['Tank', 'Heater', 'CO2 Equipment', 'Environment', 'Filter', 'Lighting', 'Water Treatment'];

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.modelNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedTypes]);

  // Filter livestock and plants
  const filteredLivestock = useMemo(() => {
    const allLivestock = [...mockFish, ...mockPlants];
    return allLivestock.filter(item => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const handleToggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleAddEquipment = (product: Product) => {
    const quantity = quantityInputs[product.id] || 1;
    addEquipment(product, quantity);
    setQuantityInputs(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleRemoveEquipment = (productId: string) => {
    removeEquipment(productId);
  };

  const handleAddLivestock = (item: Fish | Plant) => {
    const quantity = quantityInputs[item.id] || 1;
    if (item.type === 'Fish') {
      addFish(item as Fish, quantity);
    } else {
      addPlant(item as Plant, quantity);
    }
    setQuantityInputs(prev => ({ ...prev, [item.id]: 1 }));
  };

  const handleRemoveLivestock = (item: Fish | Plant) => {
    if (item.type === 'Fish') {
      removeFish(item.id);
    } else {
      removePlant(item.id);
    }
  };

  const isEquipmentInBuild = (productId: string): boolean => {
    return currentBuild.equipment.some(e => e.id === productId);
  };

  const isLivestockInBuild = (item: Fish | Plant): boolean => {
    if (item.type === 'Fish') {
      return currentBuild.fish.some(f => f.id === item.id);
    } else {
      return currentBuild.plants.some(p => p.id === item.id);
    }
  };

  const getLowestPrice = (prices: { price: number }[]) => {
    return Math.min(...prices.map(p => p.price));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Build Your Aquarium</h1>
            <Link
              to="/"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View My Build
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => {
                setSearchTab('equipment');
                setSearchQuery('');
                setSelectedTypes([]);
              }}
              className={`flex-1 px-6 py-4 text-center ${
                searchTab === 'equipment'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Equipment Search
            </button>
            <button
              onClick={() => {
                setSearchTab('livestock');
                setSearchQuery('');
                setSelectedTypes([]);
              }}
              className={`flex-1 px-6 py-4 text-center ${
                searchTab === 'livestock'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Livestock & Plants Search
            </button>
          </div>
        </div>

        {/* Equipment Tab */}
        {searchTab === 'equipment' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, model number, or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Filter by Category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {equipmentTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleToggleType(type)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedTypes.includes(type)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment Results */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Price (Lowest)</th>
                      <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredEquipment.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No equipment found. Try adjusting your search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredEquipment.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div>{product.name}</div>
                              {product.modelNumber && (
                                <div className="text-sm text-gray-500">
                                  Model: {product.modelNumber}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">{product.type}</td>
                          <td className="px-6 py-4">
                            ${getLowestPrice(product.prices).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            {isEquipmentInBuild(product.id) ? (
                              <button
                                onClick={() => handleRemoveEquipment(product.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 whitespace-nowrap"
                              >
                                Remove from Build
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  value={quantityInputs[product.id] || 1}
                                  onChange={(e) => setQuantityInputs(prev => ({
                                    ...prev,
                                    [product.id]: parseInt(e.target.value) || 1
                                  }))}
                                  className="w-16 px-2 py-1 border rounded"
                                />
                                <button
                                  onClick={() => handleAddEquipment(product)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                                >
                                  Add to Build
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Livestock & Plants Tab */}
        {searchTab === 'livestock' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search fish, plants, or livestock by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Livestock Results */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Image</th>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Scientific Name</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLivestock.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No livestock or plants found. Try adjusting your search.
                        </td>
                      </tr>
                    ) : (
                      filteredLivestock.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            {item.imageUrl && (
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4 italic text-gray-600">
                            {item.scientificName}
                          </td>
                          <td className="px-6 py-4">{item.type}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {!isLivestockInBuild(item) && (
                                <input
                                  type="number"
                                  min="1"
                                  value={quantityInputs[item.id] || 1}
                                  onChange={(e) => setQuantityInputs(prev => ({
                                    ...prev,
                                    [item.id]: parseInt(e.target.value) || 1
                                  }))}
                                  className="w-16 px-2 py-1 border rounded"
                                />
                              )}
                              {isLivestockInBuild(item) ? (
                                <button
                                  onClick={() => handleRemoveLivestock(item)}
                                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 whitespace-nowrap"
                                >
                                  Remove from Build
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAddLivestock(item)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap"
                                >
                                  Add to Build
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}