import { create } from 'zustand';

interface Message {
  _id: number;
  channel_id: string;
  message: string;
  sender: string;
  username?: string; 
  img?: string; 
}

interface MessageState {
  messages: Message[];
  currentChannelId: string; 
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setCurrentChannelId: (channelId: string) => void; 
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  currentChannelId: '', 
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setMessages: (messages) => set({ messages }),
  setCurrentChannelId: (channelId) => set({ currentChannelId: channelId }), 
}));
