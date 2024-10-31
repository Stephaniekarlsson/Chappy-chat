import { create } from 'zustand';
import { User } from '../api/userApi';
import { Channel } from '../api/channelApi';
import { DmUser } from '../api/dmApi';

type DataType = User | Channel | DmUser;

type TabType = 'users' | 'channels' | 'dms';

interface TabStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  data: DataType[]; 
  setData: (data: DataType[]) => void; 
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 'users', 
  setActiveTab: (tab) => set({ activeTab: tab }),
  data: [] as DataType[], 
  setData: (data: DataType[]) => set({ data }), 
}));