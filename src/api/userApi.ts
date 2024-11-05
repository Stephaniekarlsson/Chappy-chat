
export type User = { 
  _id: string;
  username: string; 
  image: string
  role: 'user' | 'guest' };

export interface LoginResponse {
  jwt: string;
  _id: string;
  username: string;
  image?: string;
}

export type NewUser = {
  username: string;
  password: string;
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
      _id: data.user._id,
      username: data.user.username,
      image: data.user.image,
  };
};

export const createUser = async (newUser: NewUser): Promise<User | null> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const createdUser: User = await response.json();
    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


