import React from 'react';
import { useGallery } from '../context/GalleryContext';
import GalleryCard from '../components/GalleryCard';
import SearchBar from '../components/SearchBar';

const GalleriesPage: React.FC = () => {
  const { galleries } = useGallery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Art Galleries
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Browse our curated collections organized by themes and styles
        </p>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map(gallery => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>
    </div>
  );
};

export default GalleriesPage;