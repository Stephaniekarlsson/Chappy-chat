
export type Channel = { 
  _id: string;
  channel_name: string; 
  image: string 
  isLocked: boolean};

export type ChannelMessage = {
  _id: number;
  channel_id: string; 
  sender: string;
  message: string;
  timestamp: string;
};

export type NewMessage = {
  channel_id: string; 
  sender: string;
  message: string;
};

export type NewChannel = {
  channel_name: string
  isLocked: boolean
}

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

export const createChannel = async (newChannel: NewChannel) => {
  try {
    const response = await fetch('/api/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChannel),
    });

    if (!response.ok) {
      throw new Error('Failed to create channel');
    }

    const createdChannel: Channel = await response.json();
    return createdChannel; 

  } catch (error) {
    console.error('Error creating channel:', error);
    throw error;
  }
};


export const deleteUserChannelMessages = async (channelId: string, username: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/channels/${channelId}/messages/${username}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.deletedCount === 0) {
        console.log('No channel messages found for user');
        return false;  
      }
      console.log('Channel messages deleted successfully');
      return true;  
    } else {
      const errorDetails = await response.text();
      throw new Error(`Failed to delete channel messages: ${errorDetails}`);
    }
  } catch (error) {
    console.error('Error deleting channel messages:', error);
    return false; 
  }
};

