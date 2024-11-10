import '../../css/navbar.css'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useUserStore } from "../../data/UserStore";
import { useNavigate } from "react-router-dom";
import { useTabStore } from "../../data/tabStore";
import { NavButtons } from "./NavButtons";
import { NavItemList } from "./NavItemList";
import { UserProfile } from "../users/UserProfile";
import { useCheckAuthStatus } from "../../functions/NavFunctions";
import { filteredUsers } from '../../functions/userFunctions';

export const Navbar = () => {
  const activeTab = useTabStore((state) => state.activeTab);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setData = useTabStore((state) => state.setData);
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useCheckAuthStatus();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      if ((activeTab === "users" || activeTab === "dms") && user) {  
        const filteredData = await filteredUsers(user._id);
        setData(filteredData);
      }
    };
  
    loadData();
  }, [activeTab, user, setData]);

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
          <NavItemList closeNavbar={closeNavbar} />
          <div className="my-profile">
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
};
