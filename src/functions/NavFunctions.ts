import { useUserStore } from "../data/UserStore";
import { useMessageStore } from "../data/messageStore"; 
import { useEffect } from "react";

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