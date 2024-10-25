import { ObjectId } from "mongodb";

export type User = { _id: ObjectId; username: string; image: string };

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users', error);
    return [];
  }
};