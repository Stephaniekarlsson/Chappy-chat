import { useTabStore } from "../../data/tabStore";
import { useUserStore } from "../../data/UserStore";
import { fetchChannels } from "../../api/channelApi";
import { useChannelStore } from "../../data/channelStore";
import { useHandleDmTabChange } from "../../functions/NavFunctions";
import { filteredUsers } from "../../functions/userFunctions";
import { useState } from "react";
import { useMessageStore } from "../../data/messageStore";
import { fetchUsers } from "../../api/userApi";

export const NavButtons = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setData = useTabStore((state) => state.setData);
  const user = useUserStore((state) => state.user);
  const setUsers = useUserStore((state) => state.setUsers);
  const setChannels = useChannelStore((state) => state.setChannels);
  const setMessages = useMessageStore((state) => state.setMessages);
  const { handleDmTabChange } = useHandleDmTabChange(); 
  const [isLoading, setIsLoading] = useState<string | null>(null);


  const handleTabChange = async (tab: "users" | "channels" | "dms") => {
    setActiveTab(tab);
    setIsLoading(tab);
    setMessages([]);
  
    try {
      if (tab === "users") {
        if (isAuthenticated && user) {

          const users = await filteredUsers(user._id); 
          setUsers(users);
          setData(users);
        } else {
          const allUsers = await fetchUsers(); 
          setUsers(allUsers);
          setData(allUsers);
        }
      } else if (tab === "channels") {
        const channels = await fetchChannels();
        setChannels(channels);
        setData(channels);
  
        if (isAuthenticated && user) {  
          const users = await filteredUsers(user._id);
          setUsers(users);
        }
      } else if (tab === "dms") {
        if (isAuthenticated && user) {
          await handleDmTabChange(); 
          const users = await filteredUsers(user._id);
          setUsers(users);
        }
      }
    } catch (error) {
      console.error("Error while changing tab:", error);
    } finally {
      setIsLoading(null); 
    }
  };
  

  return (
    <div className="nav-btns">
      <button
        className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
        onClick={() => handleTabChange("users")}
        disabled={isLoading === "users"}
      >
        {isLoading === 'users' ? 'Wait...' : 'Users'}
      </button>
      <button
        className={`nav-btn ${activeTab === "channels" ? "active" : ""}`}
        onClick={() => handleTabChange("channels")}
        disabled={isLoading === "channels"}

      >
        {isLoading === 'channels' ? 'Wait...' : 'Channels'}
        
      </button>
      {isAuthenticated && (
        <button
          className={`nav-btn ${activeTab === "dms" ? "active" : ""}`}
          onClick={() => handleTabChange("dms")}
          disabled={isLoading === "dms"}

        >
        {isLoading === 'dms' ? 'Wait...' : 'DM'}
  
        </button>
      )}
    </div>
  );
};
