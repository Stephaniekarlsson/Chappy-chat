import { useUserStore } from "../data/UserStore";
import { useMessageStore } from "../data/messageStore"; 
import { useTabStore } from "../data/tabStore";
import { useEffect } from "react";
import { fetchDmUsername, fetchDmMessages } from "../api/dmApi";
import { DmUser } from "../api/dmApi";

export const useCheckAuthStatus = () => {
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [setIsAuthenticated, setUser]);

  return;
};

export const useHandleChannelClick = () => {
  const setMessages = useMessageStore((state) => state.setMessages);
  const setCurrentChannelId = useMessageStore((state) => state.setCurrentChannelId);

  const handleChannelClick = async (channelId: string) => {
    try {
      const response = await fetch(`/api/channels/${channelId}/messages`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const messages = await response.json();
      setCurrentChannelId(channelId);
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching channel messages:", error);
    }
  };

  return { handleChannelClick };
};

export const useHandleDmTabChange = () => {
  const user = useUserStore((state) => state.user); 
  const setData = useTabStore((state) => state.setData);

  const handleDmTabChange = async () => {
    if (!user) {
      console.error("User not found.");
      return;
    }

    const dmUsernames = await fetchDmUsername(user.username);
    const dmUsers: DmUser[] = dmUsernames.map((username) => ({
      username,
    }));
    setData(dmUsers);
  };

  return { handleDmTabChange }; 
};

export const useHandleDmUserClick = () => { 
  const setMessages = useMessageStore((state) => state.setMessages); 
  const user = useUserStore((state) => state.user);
  const setCurrentDmUser = useMessageStore((state) => state.setCurrentDmUser); 

  const handleDmUserClick = async (dmUser: DmUser) => { 
    if (!dmUser.username || !user) return;  

    try {
      const dmMessages = await fetchDmMessages(user.username, dmUser.username); 
      console.log("DM Messages:", dmMessages);
      setMessages(dmMessages); 
      setCurrentDmUser(dmUser.username)
    } catch (error) {
      console.error("Error fetching DM messages:", error);
    }
  }; 

  return { handleDmUserClick }; 
};