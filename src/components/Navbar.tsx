import "../css/navbar.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useUserStore } from "../data/UserStore";
import { useNavigate } from "react-router-dom";
import { fetchUsers, User as UserType } from "../api/userApi";
import { Channel, fetchChannels } from "../api/channelApi";
import { useMessageStore } from "../data/messageStore"; 
import { useChannelStore } from "../data/channelStore";
import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";


export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<"users" | "channels" | "dms">(
    "users"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserType[]>([]);
  // const [channels, setChannels] = useState<ChannelType[]>([]);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const { setMessages, setCurrentChannelId } = useMessageStore();
   const { channels, setChannels } = useChannelStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleChannelClick = async (channelId: string) => {
    try {
        const response = await fetch(`/api/channels/${channelId}/messages`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const messages = await response.json();
        
        setCurrentChannelId(channelId);  
        console.log("Selected Channel ID:", channelId);
        
        setMessages(messages); 
        console.log('Fetched messages for channel:', channelId, messages);
        
    } catch (error) {
        console.error('Error fetching channel messages:', error);
    }
};


useEffect(() => {
  const loadData = async () => {
    if (activeTab === "users") {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } else if (activeTab === "channels") {
      if (channels.length === 0) { 
        const fetchedChannels = await fetchChannels() as Channel[];
        setChannels(fetchedChannels);
      }
    }
  };
  loadData();
}, [activeTab, channels.length, setChannels]);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, [setIsAuthenticated, setUser]);

  const data =
    activeTab === "users" ? users : activeTab === "channels" ? channels : [];

  return (
    <>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <RiMenu2Fill />
      </div>
      <div className={`container ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="navbar">
          <div className="nav-btns">
            <button
              className={`nav-btn ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              {" "}
              Users{" "}
            </button>

            <button
              className={`nav-btn ${activeTab === "channels" ? "active" : ""}`}
              onClick={() => setActiveTab("channels")}
            >
              {" "}
              Channels{" "}
            </button>
            {isAuthenticated && (
              <button
                className={`nav-btn ${activeTab === "dms" ? "active" : ""}`}
                onClick={() => setActiveTab("dms")}
              >
                {" "}
                DM{" "}
              </button>
            )}
          </div>

          <div className="logout-btn" onClick={handleLogout}>
            <div className="nav-btn logout">
              <RiLogoutCircleLine className="logout-icon" />
            </div>
          </div>
        </div>

        <div className="content">
          <input
            className="search-input"
            type="text"
            placeholder={`Search ${activeTab} `}
          />

          <ul>
            {data.map((item) => (
              <li key={item._id.toString()} className={`item-row ${'isLocked' in item && item.isLocked && !isAuthenticated ? 'locked' : ''}`}
              onClick={() =>
                (!('isLocked' in item) || !item.isLocked || isAuthenticated) &&
                handleChannelClick(item._id.toString())
              }>
                <img
                  src={"name" in item ? item.image : item.image}
                  className="item-image"
                />
                {"username" in item
                  ? item.username
                  : "channel_name" in item
                  ? item.channel_name
                  : ""}
                  {"isLocked" in item && item.isLocked && (
                    <span className="lock-icon">
                    {isAuthenticated ? <IoLockOpenOutline /> : <IoLockClosedOutline />}
                    </span>
                    )}
              </li>
            ))}
          </ul>
          <div className="my-profile">
            {user ? (
              <>
                <div className="item-row">
                  <img src={user.image} />
                  <p>{user.username}</p>
                </div>
              </>
            ) : (
              <p>Signed in as guest</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
