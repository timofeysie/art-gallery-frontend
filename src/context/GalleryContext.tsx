import React, { createContext, useContext, useState } from 'react';
import { Artwork, Gallery } from '../types';
import { MOCK_ARTWORKS, MOCK_GALLERIES } from '../data/mockData';

interface GalleryContextType {
  artworks: Artwork[];
  galleries: Gallery[];
  filteredArtworks: Artwork[];
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  addArtwork: (artwork: Omit<Artwork, 'id' | 'likes'>) => void;
  updateArtwork: (artwork: Artwork) => void;
  deleteArtwork: (id: string) => void;
  getArtworksByTag: (tag: string) => Artwork[];
  searchArtworks: (query: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(MOCK_ARTWORKS);
  const [galleries, setGalleries] = useState<Gallery[]>(MOCK_GALLERIES);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(MOCK_ARTWORKS);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const getArtworksByTag = (tag: string): Artwork[] => {
    return artworks.filter(artwork => artwork.tags.includes(tag));
  };

  const addArtwork = (newArtwork: Omit<Artwork, 'id' | 'likes'>) => {
    const artwork: Artwork = {
      ...newArtwork,
      id: (artworks.length + 1).toString(),
      likes: 0
    };
    
    setArtworks(prev => [...prev, artwork]);
    setFilteredArtworks(prev => [...prev, artwork]);
    
    // Check if we need to create a new gallery for any new tags
    newArtwork.tags.forEach(tag => {
      if (!galleries.some(gallery => gallery.tag === tag)) {
        const newGallery: Gallery = {
          id: (galleries.length + 1).toString(),
          title: tag,
          description: `Collection of ${tag} artworks`,
          tag
        };
        setGalleries(prev => [...prev, newGallery]);
      }
    });
  };

  const updateArtwork = (updatedArtwork: Artwork) => {
    setArtworks(prev => 
      prev.map(artwork => 
        artwork.id === updatedArtwork.id ? updatedArtwork : artwork
      )
    );
    
    setFilteredArtworks(prev => 
      prev.map(artwork => 
        artwork.id === updatedArtwork.id ? updatedArtwork : artwork
      )
    );
  };

  const deleteArtwork = (id: string) => {
    setArtworks(prev => prev.filter(artwork => artwork.id !== id));
    setFilteredArtworks(prev => prev.filter(artwork => artwork.id !== id));
  };

  const searchArtworks = (query: string) => {
    if (!query.trim()) {
      setFilteredArtworks(activeTag ? getArtworksByTag(activeTag) : artworks);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = artworks.filter(artwork => 
      artwork.title.toLowerCase().includes(lowerQuery) ||
      artwork.artistName.toLowerCase().includes(lowerQuery) ||
      artwork.description.toLowerCase().includes(lowerQuery) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    
    setFilteredArtworks(results);
  };

  return (
    <GalleryContext.Provider value={{
      artworks,
      galleries,
      filteredArtworks,
      activeTag,
      setActiveTag: (tag) => {
        setActiveTag(tag);
        setFilteredArtworks(tag ? getArtworksByTag(tag) : artworks);
      },
      addArtwork,
      updateArtwork,
      deleteArtwork,
      getArtworksByTag,
      searchArtworks
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};