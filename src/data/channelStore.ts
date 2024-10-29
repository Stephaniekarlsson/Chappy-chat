import { create } from 'zustand';
import { Channel } from '../api/channelApi';

interface ChannelState {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void; 
}

export const useChannelStore = create<ChannelState>((set) => ({
  channels: [],
  setChannels: (channels) => set({ channels }),
}));
