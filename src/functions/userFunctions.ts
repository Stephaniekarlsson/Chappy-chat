import { fetchUsers } from "../api/userApi";
import { User } from "../api/userApi";
import { useUserStore } from "../data/UserStore";
import { deleteUser } from "../api/userApi";
import { deleteUserDmMessages } from "../api/dmApi";
import { deleteUserChannelMessages } from "../api/channelApi";
import { useMessageStore } from "../data/messageStore";

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
  const currentChannelId = useMessageStore((state) => state.currentChannelId);

  const deleteUserWithMessages = async (_id: string, username: string): Promise<void> => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
 
      const dmDeleted = await deleteUserDmMessages(username);
      if (dmDeleted) {
        console.log('DM messages deleted successfully');
      } else {
        console.log('No DM messages to delete for user');
      }

      if (currentChannelId) {
        const channelDeleted = await deleteUserChannelMessages(currentChannelId, username);
        if (channelDeleted) {
          console.log('Channel messages deleted successfully');
        } else {
          console.log('No channel messages to delete for user');
        }
      } else {
        console.log('No channel selected; nothing to delete');
      }

      await deleteUser(_id);
      console.log('User deleted successfully');
      
    } catch (error) {
      console.error('Error deleting user and messages:', error);
    }
  };

  return { deleteUserWithMessages };
};

