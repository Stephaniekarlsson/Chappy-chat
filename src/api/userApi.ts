import { ObjectId } from "mongodb";

export type User = { _id: ObjectId; username: string; image: string };

export interface LoginResponse {
  jwt: string;
  username: string;
  image?: string;
}

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

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error occurred during login');
  }

  const data = await response.json();
  return {
      jwt: data.jwt,
      username: data.user.username,
      image: data.user.image,
  };
};