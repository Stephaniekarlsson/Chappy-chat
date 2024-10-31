import "../css/navbar.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useUserStore } from "../data/UserStore";
import { useNavigate } from "react-router-dom";
import { useTabStore } from "../data/tabStore";
import { NavButtons } from "./NavButtons";
import { NavItemList } from "./NavItemList";
import { UserProfile } from "./UserProfile";
import { useCheckAuthStatus } from "../functions/NavFunctions";
import { fetchUsers } from "../api/userApi";

export const Navbar = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();
  const setData = useTabStore((state) => state.setData);
  const data = useTabStore((state) => state.data);

  
  useCheckAuthStatus(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const loadData = async () => {
      if (activeTab === "users" && data.length === 0) {
        const fetchedUsers = await fetchUsers();
        setData(fetchedUsers);
      }
    };

    loadData();
  }, [activeTab, data.length, setData]);

  return (
    <>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <RiMenu2Fill />
      </div>
      <div className={`container ${isOpen ? "expanded" : "collapsed"}`}>
        <div className="navbar">
          <div className="nav-btns">
            <NavButtons />
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
          <NavItemList />
          <div className="my-profile">
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
};
