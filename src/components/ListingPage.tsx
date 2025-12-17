import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Lock, Globe, Trash2, Edit2, Upload, X } from 'lucide-react';
import { useBuild } from '../context/BuildContext';
import { mockComments } from '../data/mockData';
import { Comment } from '../types';
import { RichTextEditor } from './RichTextEditor';

export function ListingPage() {
  const {
    currentBuild,
    updateBuild,
    removeEquipment,
    removeFish,
    removePlant
  } = useBuild();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const shareUrl = `https://aquarium-builder.com/build/${currentBuild.id}`;

  const getCheapestPrice = (prices: { source: string; price: number; url: string }[]) => {
    return prices.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest
    );
  };

  const getTotalPrice = () => {
    return currentBuild.equipment.reduce((total, item) => {
      const cheapest = getCheapestPrice(item.prices);
      return total + cheapest.price;
    }, 0);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      buildId: currentBuild.id,
      author: 'CurrentUser',
      content: newComment,
      createdAt: new Date().toISOString()
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateBuild({
          photos: [...currentBuild.photos, result]
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    updateBuild({
      photos: currentBuild.photos.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/build" className="text-blue-600 hover:text-blue-700">
              ← Back to Builder
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => updateBuild({ isPublic: !currentBuild.isPublic })}
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                  currentBuild.isPublic 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                {currentBuild.isPublic ? (
                  <>
                    <Globe className="w-4 h-4" />
                    Public
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Private
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Equipment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">Equipment</h2>
              
              {currentBuild.equipment.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No equipment added yet
                </div>
              ) : (
                <div className="space-y-3">
                  {currentBuild.equipment.map(item => {
                    const cheapest = getCheapestPrice(item.prices);
                    return (
                      <div key={item.id} className="border rounded p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.type}</div>
                          </div>
                          <button
                            onClick={() => removeEquipment(item.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="bg-gray-50 rounded p-2">
                          <div className="text-xs text-gray-600">{cheapest.source}</div>
                          <div className="flex items-center justify-between">
                            <span>${cheapest.price.toFixed(2)}</span>
                            <a 
                              href={cheapest.url} 
                              className="text-xs text-blue-600 hover:underline"
                            >
                              View →
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fish & Livestock */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">Fish & Livestock</h2>
              {currentBuild.fish.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">No fish added yet</p>
              ) : (
                <div className="space-y-3">
                  {currentBuild.fish.map(fish => (
                    <div key={fish.id} className="flex items-center gap-3 border-b pb-3">
                      {fish.imageUrl && (
                        <img 
                          src={fish.imageUrl} 
                          alt={fish.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{fish.name}</div>
                        <div className="text-xs text-gray-500 italic truncate">{fish.scientificName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">×{fish.quantity}</span>
                        <button
                          onClick={() => removeFish(fish.id)}
                          className="p-1 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Plants */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">Plants</h2>
              {currentBuild.plants.length === 0 ? (
                <p className="text-gray-500 text-center py-4 text-sm">No plants added yet</p>
              ) : (
                <div className="space-y-3">
                  {currentBuild.plants.map(plant => (
                    <div key={plant.id} className="flex items-center gap-3 border-b pb-3">
                      {plant.imageUrl && (
                        <img 
                          src={plant.imageUrl} 
                          alt={plant.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{plant.name}</div>
                        <div className="text-xs text-gray-500 italic truncate">{plant.scientificName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">×{plant.quantity}</span>
                        <button
                          onClick={() => removePlant(plant.id)}
                          className="p-1 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={currentBuild.title}
                  onChange={(e) => updateBuild({ title: e.target.value })}
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl">{currentBuild.title}</h1>
                  <button
                    onClick={() => setIsEditingTitle(true)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
              <p className="text-gray-500 mt-2">
                By {currentBuild.author} • {formatDate(currentBuild.createdAt)}
              </p>
            </div>

            {/* Description with Photo Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">Description</h2>
              
              {/* Photo Gallery */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3>Photos</h3>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    Upload Photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {currentBuild.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentBuild.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Build photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                    <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No photos uploaded yet. Click "Upload Photos" to add images of your build.</p>
                  </div>
                )}
              </div>

              {/* Description Text */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3>About This Build</h3>
                  {!isEditingDescription && (
                    <button
                      onClick={() => setIsEditingDescription(true)}
                      className="px-3 py-1 border rounded hover:bg-gray-50 text-sm flex items-center gap-2"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                  )}
                </div>
                {isEditingDescription ? (
                  <RichTextEditor
                    value={currentBuild.description || ''}
                    onChange={(html) => updateBuild({ description: html })}
                    onBlur={() => setIsEditingDescription(false)}
                  />
                ) : (
                  <div>
                    {currentBuild.description ? (
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentBuild.description }}
                      />
                    ) : (
                      <p className="text-gray-500 italic">No description yet. Click "Edit" to add one.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="mb-4">Comments ({comments.length})</h2>
              
              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment or question..."
                  rows={3}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl mb-4">Share Your Build</h3>
            <p className="text-gray-600 mb-4">
              {currentBuild.isPublic 
                ? 'Your build is public. Anyone with this link can view it.'
                : 'Your build is private. Make it public to share with others.'}
            </p>
            {currentBuild.isPublic && (
              <div className="bg-gray-50 p-3 rounded mb-4 break-all text-sm">
                {shareUrl}
              </div>
            )}
            <div className="flex gap-3">
              {currentBuild.isPublic && (
                <button
                  onClick={handleCopyShareLink}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Link
                </button>
              )}
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
