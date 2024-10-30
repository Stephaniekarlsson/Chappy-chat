import { create } from 'zustand';
import { User } from '../api/userApi';
import { Channel } from '../api/channelApi';

type DataType = User | Channel;

type TabType = 'users' | 'channels' | 'dms';

interface TabStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  data: (User | Channel)[]; 
  setData: (data: (User | Channel)[]) => void; 
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 'users', 
  setActiveTab: (tab) => set({ activeTab: tab }),
  data: [] as DataType[], 
  setData: (data: DataType[]) => set({ data }), 
}));