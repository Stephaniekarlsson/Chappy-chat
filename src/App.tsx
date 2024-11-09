import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useUserStore } from "./data/UserStore";

function App() {
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUsers = useUserStore((state) => state.setUsers);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usersData = localStorage.getItem('users');
    
    if (usersData) {
      setUsers(JSON.parse(usersData)); 
    }
    if (token) {
      setIsAuthenticated(true);
    }


  }, [setIsAuthenticated, setUsers]);

  return <Outlet />;
}

export default App;
