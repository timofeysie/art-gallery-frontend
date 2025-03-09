import axios from 'axios';
import { Artwork, Gallery, User } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // Important for handling auth cookies
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const galleryApi = {
  // Artwork endpoints
  getArtworks: () => api.get<Artwork[]>('/gallery/artworks').then(res => res.data),
  createArtwork: (artwork: Omit<Artwork, 'id' | 'likes'>) => 
    api.post<Artwork>('/gallery/artworks', artwork).then(res => res.data),
  updateArtwork: (artwork: Artwork) => 
    api.put<Artwork>(`/gallery/artworks/${artwork.id}`, artwork).then(res => res.data),
  deleteArtwork: (id: string) => 
    api.delete(`/gallery/artworks/${id}`),

  // Gallery endpoints
  getGalleries: () => api.get<Gallery[]>('/gallery/galleries').then(res => res.data),
  getGalleryById: (id: string) => 
    api.get<Gallery>(`/gallery/galleries/${id}`).then(res => res.data),
  createGallery: (gallery: Omit<Gallery, 'id'>) => 
    api.post<Gallery>('/gallery/galleries', gallery).then(res => res.data),
};

export const profileApi = {
  getProfile: () => api.get<User>('/profiles').then(res => res.data),
  updateProfile: (profile: Partial<User>) => 
    api.put<User>('/profiles', profile).then(res => res.data),
};