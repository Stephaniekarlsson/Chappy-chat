import { fetchUsers } from "../api/userApi";
import { User } from "../api/userApi";

export const filteredUsers = async (userId: string) => {
  const fetchedUsers = await fetchUsers();
  return fetchedUsers.filter((user: User) => user._id !== userId);
};
