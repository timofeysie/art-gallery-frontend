import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ArtworkDetailPage from '../pages/ArtworkDetailPage';
import GalleryDetailPage from '../pages/GalleryDetailPage';
import AddArtist from '../pages/AddArtist';
import AddGallery from '../pages/AddGallery';
import AddArtwork from '../pages/AddArtwork';

// Define a custom route type that includes the protected property
export type CustomRouteObject = {
  path?: string;
  element?: React.ReactNode;
  children?: CustomRouteObject[];
  protected?: boolean;
  index?: boolean;
};

// Define all application routes
export const routes: CustomRouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <Profile />,
    protected: true, // This route requires authentication
  },
  {
    path: '/add-artist',
    element: <AddArtist />,
    protected: true, // This route requires authentication
  },
  {
    path: '/add-gallery',
    element: <AddGallery />,
    protected: true, // This route requires authentication
  },
  {
    path: '/add-artwork',
    element: <AddArtwork />,
    protected: true, // This route requires authentication
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/artwork/:id',
        element: <ArtworkDetailPage />,
      },
      {
        path: '/gallery/:id',
        element: <GalleryDetailPage />,
      },
    ],
  },
]; 