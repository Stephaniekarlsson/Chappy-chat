import { useTabStore } from "../data/tabStore";
import { useUserStore } from "../data/UserStore";
import { useChannelStore } from "../data/channelStore";
import { fetchUsers } from "../api/userApi";
import { fetchChannels } from "../api/channelApi";

export const NavButtons = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setActiveTab = useTabStore((state) => state.setActiveTab);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setData = useTabStore((state) => state.setData);
  const setUsers = useUserStore((state) => state.setUsers);
  const setChannels = useChannelStore((state) => state.setChannels);


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
