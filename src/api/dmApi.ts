import { ObjectId } from "mongodb";

export type Dm = { _id: ObjectId; username: string; image: string };

export const fetchDms = async (): Promise<Dm[]> => {
  try {
    const response = await fetch('/api/direct-message');
    if (!response.ok) {
      throw new Error('Failed to fetch dms');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching dms', error);
    return [];
  }
};