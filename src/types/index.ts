export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'guest';
  profileImage?: string;
  bio?: string;
  likedArtworks: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  toggleLike: (artworkId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          email: string;
          role: 'admin' | 'guest';
          profile_image: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          role?: 'admin' | 'guest';
          profile_image?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          role?: 'admin' | 'guest';
          profile_image?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: string;
  createdAt: string;
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  artworks: string[];
}