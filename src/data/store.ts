import { create } from 'zustand';

interface UserState {
  isAuthenticated: boolean;
  user: { username: string; image: string } | null;
  setIsAuthenticated: (authStatus: boolean) => void;
  setUser: (userData: { username: string; image: string }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false, 
  user: null,
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setUser: (userData) => set({ user: userData }),
}));