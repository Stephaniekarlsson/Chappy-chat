
export type DmMessage = {
  sender: string;
  receiver: string
  message: string;
  timestamp: Date;
};
 
export const fetchDmMessages = async (receiver: string): Promise<DmMessage[]> => {
  try {
      const response = await fetch(`/api/channels/${receiver}/messages`);
      if (!response.ok) {
          throw new Error('Failed to fetch messages');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching messages', error);
      return [];
  }
};

