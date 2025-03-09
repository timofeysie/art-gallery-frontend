import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { supabase } from '../lib/supabase';

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    // Get session from Supabase
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            username: profile.username,
            likedArtworks: profile.liked_artworks || [],
            role: profile.role || 'user' // Add required role field with default value
          });
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };
    
    getSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await refreshProfile();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Refresh user profile data
  const refreshProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profile) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            username: profile.username,
            likedArtworks: profile.liked_artworks || [],
            role: profile.role || 'user' // Add required role field with default value
          });
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error refreshing profile:', err);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      await refreshProfile();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // Register with Supabase
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            username,
            email,
            liked_artworks: [],
          });
          
        if (profileError) {
          throw profileError;
        }
      }
      
      await refreshProfile();
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: userData.username,
          // Add other fields as needed
        })
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      await refreshProfile();
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  // Toggle like functionality from art gallery app
  const toggleLike = async (artworkId: string) => {
    if (!user) return;

    try {
      const updatedLikedArtworks = [...(user.likedArtworks || [])];
      const likedIndex = updatedLikedArtworks.indexOf(artworkId);

      if (likedIndex === -1) {
        updatedLikedArtworks.push(artworkId);
      } else {
        updatedLikedArtworks.splice(likedIndex, 1);
      }

      // Update in database
      const { error } = await supabase
        .from('profiles')
        .update({
          liked_artworks: updatedLikedArtworks
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setUser({
        ...user,
        likedArtworks: updatedLikedArtworks
      });
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: loading,
        login,
        register,
        logout,
        updateProfile,
        toggleLike,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};