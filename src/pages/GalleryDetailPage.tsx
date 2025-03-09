import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import ArtworkCard from '../components/ArtworkCard';

const GalleryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { galleries, setActiveTag, filteredArtworks } = useGallery();
  
  const gallery = galleries.find(g => g.id === id);
  
  useEffect(() => {
    if (gallery?.tag) {
      setActiveTag(gallery.tag);
    }
    
    return () => {
      // Clear the filter when leaving the page
      setActiveTag(null);
    };
  }, [gallery?.tag]);
  
  if (!gallery) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery not found</h2>
        <Link to="/galleries" className="text-indigo-600 hover:text-indigo-800">
          Return to galleries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/galleries" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Galleries
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">
          {gallery.title}
        </h1>
        <p className="text-xl text-gray-600">
          {gallery.description}
        </p>
      </div>
      
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map(artwork => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No artworks found in this gallery.</p>
        </div>
      )}
    </div>
  );
};

export default GalleryDetailPage;