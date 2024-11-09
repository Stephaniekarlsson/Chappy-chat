import { fetchUsers } from "../api/userApi";
import { User } from "../api/userApi";
import { useUserStore } from "../data/UserStore";
import { deleteUser } from "../api/userApi";
import { deleteUserDmMessages } from "../api/dmApi";
import { deleteUserChannelMessages, fetchChannels, fetchChannelMessages } from "../api/channelApi";



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


export const useDeleteUserWithMessages = () => {
  const user = useUserStore((state) => state.user);

  const deleteUserWithMessages = async (_id: string, username: string): Promise<void> => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      
      await deleteUserDmMessages(username);
      
      const allChannels = await fetchChannels();

      for (const channel of allChannels) {
        const channelMessages = await fetchChannelMessages(channel._id);
        const userMessages = channelMessages.filter(msg => msg.sender === username);

        if (userMessages.length > 0) {
          await deleteUserChannelMessages(channel._id, username);
        }
      }

      await deleteUser(_id);

    } catch (error) {
      console.error('Error deleting user and messages:', error);
    }
  };

  return { deleteUserWithMessages };
};


