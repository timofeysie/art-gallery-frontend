import React from 'react';
import { Link } from 'react-router-dom';
import { Gallery } from '../types';
import { useGallery } from '../context/GalleryContext';

interface GalleryCardProps {
  gallery: Gallery;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery }) => {
  const { getArtworksByTag } = useGallery();
  const artworksInGallery = getArtworksByTag(gallery.tag);
  
  // Get a sample image from the gallery's artworks
  const sampleImage = artworksInGallery.length > 0 
    ? artworksInGallery[0].imageUrl 
    : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

  return (
    <Link to={`/gallery/${gallery.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative pb-[56.25%] overflow-hidden">
          <img 
            src={sampleImage} 
            alt={gallery.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{gallery.title}</h3>
              <p className="text-sm opacity-90">{artworksInGallery.length} artworks</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 line-clamp-2">{gallery.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;