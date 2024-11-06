import { useTabStore } from "../../data/tabStore";
import { useUserStore } from "../../data/UserStore";
import { fetchUsers } from "../../api/userApi";
import { fetchChannels } from "../../api/channelApi";
import { useChannelStore } from "../../data/channelStore";
import { useHandleDmTabChange } from "../../functions/NavFunctions";

export const NavButtons = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setData = useTabStore((state) => state.setData);
  const user = useUserStore((state) => state.user);
  const setUsers = useUserStore((state) => state.setUsers);
  const setChannels = useChannelStore((state) => state.setChannels);
  const { handleDmTabChange } = useHandleDmTabChange(); 


  const handleTabChange = async (tab: "users" | "channels" | "dms") => {
    setActiveTab(tab);

    if (tab === "users") {
      const users = await fetchUsers();
      setUsers(users);
      setData(users);
    } else if (tab === "channels") {
      const channels = await fetchChannels();
      setChannels(channels)
      setData(channels);
    } else if (tab === "dms") {
      if (user) {
        await handleDmTabChange()
      } 
    }
    
  };

  return (
    <div className="nav-btns">
      <button
        className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
        onClick={() => handleTabChange("users")}
      >
        Users
      </button>
      <button
        className={`nav-btn ${activeTab === "channels" ? "active" : ""}`}
        onClick={() => handleTabChange("channels")}
      >
        Channels
      </button>
      {isAuthenticated && (
        <button
          className={`nav-btn ${activeTab === "dms" ? "active" : ""}`}
          onClick={() => handleTabChange("dms")}
        >
          DM
        </button>
      )}
    </div>
  );
};
