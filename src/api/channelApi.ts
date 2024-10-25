import { ObjectId } from "mongodb";

export type Channel = { _id: ObjectId; channel_name: string; image: string };

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