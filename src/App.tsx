import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import { GalleryProvider } from './context/GalleryContext';
import { routes, CustomRouteObject } from './routes';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Render routes recursively
const renderRoutes = (routes: CustomRouteObject[]) => {
  return routes.map((route) => {
    // For routes with children
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    
    // For protected routes
    if (route.protected) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              {route.element}
            </ProtectedRoute>
          }
        />
      );
    }
    
    // For public routes
    return (
      <Route
        key={route.path || `index-${Math.random()}`}
        path={route.path}
        index={route.index}
        element={route.element}
      />
    );
  });
};

// Use routes from the centralized routes file
function AppRoutes() {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Routes>
      {renderRoutes(routes)}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <GalleryProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </GalleryProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;