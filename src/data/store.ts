import { create } from 'zustand';

interface UserState {
  isAuthenticated: boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false, 
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
}));