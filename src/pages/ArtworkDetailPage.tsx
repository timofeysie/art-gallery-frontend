import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { useAuth } from '../context/AuthContext';

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artworks, deleteArtwork } = useGallery();
  const { user, isAuthenticated, toggleLike } = useAuth();
  const navigate = useNavigate();
  
  const artwork = artworks.find(a => a.id === id);
  
  if (!artwork) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Artwork not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          Return to home
        </Link>
      </div>
    );
  }
  
  const isLiked = user?.likedArtworks.includes(artwork.id) || false;
  
  const handleLike = () => {
    if (isAuthenticated) {
      toggleLike(artwork.id);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: `Check out "${artwork.title}" by ${artwork.artistName}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert(`Share: ${artwork.title} by ${artwork.artistName}`);
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      deleteArtwork(artwork.id);
      navigate('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Gallery
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{artwork.title}</h1>
              <p className="text-xl text-gray-700 mb-4">{artwork.artistName}, {artwork.year}</p>
            </div>
            
            {user?.isAdmin && (
              <div className="flex space-x-2">
                <Link 
                  to={`/admin/edit/${artwork.id}`}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <Edit size={20} />
                </Link>
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full text-red-500 hover:bg-gray-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">{artwork.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Medium</p>
                <p className="font-medium">{artwork.medium}</p>
              </div>
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-medium">{artwork.location}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {artwork.tags.map((tag, index) => (
                <Link 
                  key={index} 
                  to={`/?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center px-4 py-2 rounded-md ${
                isAuthenticated 
                  ? isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isAuthenticated ? (isLiked ? 'Unlike' : 'Like') : 'Login to Like'}
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;