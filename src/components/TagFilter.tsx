import React from 'react';
import { X } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

const TagFilter: React.FC = () => {
  const { galleries, activeTag, setActiveTag } = useGallery();
  
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
  };
  
  const clearFilter = () => {
    setActiveTag(null);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Filter by Category</h3>
        {activeTag && (
          <button 
            onClick={clearFilter}
            className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            Clear <X size={14} className="ml-1" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {galleries.map(gallery => (
          <button
            key={gallery.id}
            onClick={() => handleTagClick(gallery.tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeTag === gallery.tag
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {gallery.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;