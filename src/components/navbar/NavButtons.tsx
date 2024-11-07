import { useTabStore } from "../../data/tabStore";
import { useUserStore } from "../../data/UserStore";
import { fetchChannels } from "../../api/channelApi";
import { useChannelStore } from "../../data/channelStore";
import { useHandleDmTabChange } from "../../functions/NavFunctions";
import { filteredUsers } from "../../functions/userFunctions";
import { useState } from "react";

export const NavButtons = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setData = useTabStore((state) => state.setData);
  const user = useUserStore((state) => state.user);
  const setUsers = useUserStore((state) => state.setUsers);
  const setChannels = useChannelStore((state) => state.setChannels);
  const { handleDmTabChange } = useHandleDmTabChange(); 
  const [isLoading, setIsLoading] = useState<string | null>(null);


  const handleTabChange = async (tab: "users" | "channels" | "dms") => {
    setActiveTab(tab);
    setIsLoading(tab); 

    try {
      if (tab === "users") {
        if (user) {
          const users = await filteredUsers(user._id); 
          setUsers(users);
          setData(users);
        }
      } else if (tab === "channels") {
        const channels = await fetchChannels();
        setChannels(channels);
        setData(channels);
      } else if (tab === "dms") {
        if (user) {
          await handleDmTabChange(); 
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
