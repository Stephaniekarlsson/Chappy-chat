
export type DmUser = {
  username: string;
}

export type DmMessage = {
  sender: string;
  receiver: string
  message: string;
  timestamp: Date;
};
 
export const fetchDmMessages = async (receiver: string, sender: string): Promise<DmMessage[]> => {
  try {
      const response = await fetch(`/api/direct-messages?sender=${sender}&receiver=${receiver}`);
      if (!response.ok) {
          throw new Error('Failed to fetch messages');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching messages', error);
      return [];
  }
};


export const fetchDmUsername = async (username: string): Promise<string[]> => {
  try {
    const response = await fetch(`/api/direct-messages/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch DM users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching DM users:', error);
    return [];
  }
};

export const addDmMessage = async (newMessage: DmMessage) => {
  try {
    const response = await fetch('/api/direct-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    if (!response.ok) {
      throw new Error('Failed to send DM message');
    }

    const message = await response.json();
    return message;
  } catch (error) {
    console.error('Error sending DM message:', error);
    return null;
  }
};

