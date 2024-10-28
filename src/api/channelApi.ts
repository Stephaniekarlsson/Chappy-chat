import { ObjectId } from "mongodb";

export type Channel = { _id: ObjectId; channel_name: string; image: string };
export type ChannelMessage = {
  _id: ObjectId;
  channel_id: string; 
  sender: string;
  message: string;
  timestamp: Date;
};

export const fetchChannels = async (): Promise<Channel[]> => {
  try {
    const response = await fetch('/api/channels');
    if (!response.ok) {
      throw new Error('Failed to fetch channels');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching channels', error);
    return [];
  }
};

export const fetchChannelMessages = async (channelId: string): Promise<ChannelMessage[]> => {
  try {
      const response = await fetch(`/api/channels/${channelId}/messages`);
      if (!response.ok) {
          throw new Error('Failed to fetch messages');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching messages', error);
      return [];
  }
};