import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchArtworks } = useGallery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchArtworks(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Debounce search as user types
    const timeoutId = setTimeout(() => {
      searchArtworks(newQuery);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search artworks, artists, tags..."
          value={query}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;