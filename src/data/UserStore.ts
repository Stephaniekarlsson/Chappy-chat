import { create } from 'zustand';

interface User {
  username: string;
  image?: string; 
  role: 'user' | 'guest'
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null; 
  setIsAuthenticated: (authStatus: boolean) => void;
  setUser: (userData: User | null) => void; 
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setUser: (userData) => set({ user: userData }),
}));