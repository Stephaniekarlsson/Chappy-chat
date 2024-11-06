import { create } from 'zustand';

interface User {
  _id: string;
  username: string;
  image?: string; 
  role?: 'user' | 'guest'
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null; 
  users: User[];
  setIsAuthenticated: (authStatus: boolean) => void;
  setUser: (userData: User | null) => void; 
  setUsers: (userList: User[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  user: null,
  users: [],
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setUser: (userData) => set({ user: userData }),
  setUsers: (userList) => set({ users: userList }),
}));