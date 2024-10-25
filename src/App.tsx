import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { useUserStore } from './data/store';

function App() {

  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          setIsAuthenticated(true);
      }
  }, [setIsAuthenticated]);

  return (

    <Outlet/>
  
  )
}

export default App
