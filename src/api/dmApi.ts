
export type DmUser = {
  username: string;
}

export type DmMessage = {
  sender: string;
  receiver: string
  message: string;
  timestamp: string;
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

export const deleteUserDmMessages = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/direct-messages/username/${username}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.deletedCount === 0) {
        console.log('No DM messages found for user');
        return false;
      }
      console.log('DM messages deleted successfully');
      return true; 
    } else {
      const errorDetails = await response.text();
      if (errorDetails.includes('No messages found from sender')) {
        console.log('No DM messages to delete for user');
        return false; 
      }
      throw new Error(`Failed to delete DM messages: ${errorDetails}`);
    }
  } catch (error) {
    console.error('Error deleting DM messages:', error);
    return false;  
  }
};
