import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { Artwork } from '../types';
import { useAuth } from '../context/AuthContext';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const { user, isAuthenticated, toggleLike } = useAuth();
  
  const isLiked = user?.likedArtworks.includes(artwork.id) || false;
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleLike(artwork.id);
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real app, this would use the Web Share API or copy a link
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: `Check out "${artwork.title}" by ${artwork.artistName}`,
        url: window.location.origin + `/artwork/${artwork.id}`
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert(`Share: ${artwork.title} by ${artwork.artistName}`);
    }
  };

  return (
    <Link to={`/artwork/${artwork.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative pb-[75%] overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{artwork.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{artwork.artistName}, {artwork.year}</p>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{artwork.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {artwork.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-600"
                >
                  {tag}
                </span>
              ))}
              {artwork.tags.length > 2 && (
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-600">
                  +{artwork.tags.length - 2}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleLike}
                className={`p-1 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                disabled={!isAuthenticated}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleShare}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;