
export type Channel = { 
  _id: number;
  channel_name: string; 
  image: string 
  isLocked: boolean};

export type ChannelMessage = {
  _id: number;
  channel_id: string; 
  sender: string;
  message: string;
  timestamp: Date;
};

export type NewMessage = {
  channel_id: string; 
  sender: string;
  message: string;
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

export const fetchChannelMessages = async (channel_id: string): Promise<ChannelMessage[]> => {
  try {
      const response = await fetch(`/api/channels/${channel_id}/messages`);
      if (!response.ok) {
          throw new Error('Failed to fetch messages');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching messages', error);
      return [];
  }
};

export const addChannelMessage = async (newMessage: NewMessage): Promise<ChannelMessage | null> => {
  try {
    const response = await fetch(`/api/channels/${newMessage.channel_id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    if (!response.ok) {
      throw new Error('Failed to add message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding message:', error);
    return null;
  }
};