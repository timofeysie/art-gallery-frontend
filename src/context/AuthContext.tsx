import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { supabase } from '../lib/supabase';

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
            role: profile.role,
            profileImage: profile.profile_image || undefined,
            bio: profile.bio || undefined
          });
        }
      }
      
      setLoading(false);
    };
    
    getSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
              role: profile.role,
              profileImage: profile.profile_image || undefined,
              bio: profile.bio || undefined
            });
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );
    
    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    // Fetch user profile after login
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profile) {
      setUser({
        id: data.user.id,
        email: data.user.email!,
        username: profile.username,
        role: profile.role,
        profileImage: profile.profile_image || undefined,
        bio: profile.bio || undefined
      });
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();
      
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    // Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (!data.user) {
      throw new Error('Registration failed');
    }
    
    // Create profile for new user
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        username,
        email,
        role: 'guest',
        profile_image: `https://ui-avatars.com/api/?name=${username}&background=random`,
        bio: ''
      });
      
    if (profileError) throw profileError;
    
    // Set user state
    setUser({
      id: data.user.id,
      email,
      username,
      role: 'guest',
      profileImage: `https://ui-avatars.com/api/?name=${username}&background=random`,
      bio: ''
    });
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        profile_image: userData.profileImage,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
      
    if (error) throw error;
    
    setUser({ ...user, ...userData });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};