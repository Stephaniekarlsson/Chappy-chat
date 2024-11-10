import { create } from 'zustand';
import { DmMessage } from '../api/dmApi';

export type MessageType = Message | DmMessage; 

export interface Message {
  _id?: number;
  channel_id: string;
  message: string;
  sender: string;
  username?: string; 
  img?: string; 
  timestamp?: string;
}

interface MessageState {
  messages: MessageType[];
  currentChannelId: string | null; 
  currentDmUser: string | null;
  addMessage: (message: Message) => void;
  setMessages: (messages: MessageType[]) => void;
  setCurrentChannelId: (channelId: string | null) => void; 
  setCurrentDmUser: (username: string | null) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  currentChannelId: '', 
  currentDmUser: null,
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setMessages: (messages) => set({ messages }),
  setCurrentChannelId: (channelId) => set({ currentChannelId: channelId }), 
  setCurrentDmUser: (username) => set({ currentDmUser: username }),
}));
