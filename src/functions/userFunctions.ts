import { fetchUsers } from "../api/userApi";
import { User } from "../api/userApi";
import { useUserStore } from "../data/UserStore";

export const filteredUsers = async (userId: string) => {
  const fetchedUsers = await fetchUsers();
  return fetchedUsers.filter((user: User) => user._id !== userId);
};

export const validatePassword = (password: string): string | null => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password's not valid'";
  }
  return null; 
};

export const getDmUserInfo = (username: string) => {
  const users = useUserStore.getState().users;
  const user = users.find(user => user.username === username);

  return user
    ? { image: user.image || 'https://i.postimg.cc/C5hXKtCL/Designer-10.jpg', username: user.username }
    : { image: 'https://i.postimg.cc/C5hXKtCL/Designer-10.jpg', username };
};