import '../css/navbar.css'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';
import { useUserStore } from '../data/store';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, User as UserType } from '../api/userApi';
import { fetchChannels, Channel as ChannelType } from '../api/channelApi';

export const Navbar = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'channels' | 'dms'>('users');
    const [isOpen, setIsOpen] = 
    useState<boolean>(false)
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
    const navigate = useNavigate()
    const [users, setUsers] = useState<UserType[]>([]);
    const [channels, setChannels] = useState<ChannelType[]>([]);
    const user = useUserStore((state) => state.user);
    console.log("Current user in Navbar:", user); 

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false);
        navigate('/')
    }

    useEffect(() => {
        const loadData = async () => {
            if (activeTab === 'users') {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } else if (activeTab === 'channels') {
                const fetchedChannels = await fetchChannels();
                setChannels(fetchedChannels);
            }
        };
        loadData();
    }, [activeTab]); 


    const data = activeTab === 'users' ? users : activeTab === 'channels' ? channels : [];

    return (
        <>
        <div className="hamburger-icon" onClick={toggleMenu}>
            <RiMenu2Fill />
        </div>
        <div className={`container ${isOpen ? 'expanded' : 'collapsed'}`}>
            <div className="navbar">
                <div className="nav-btns">
                    <button
                    className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                    > Users </button>

                    <button
                        className={`nav-btn ${activeTab === 'channels' ? 'active' : ''}`}
                        onClick={() => setActiveTab('channels')}
                    > Channels </button>
                {isAuthenticated && (
                    <button
                        className={`nav-btn ${activeTab === 'dms' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dms')}
                    > DM </button>
                )}
                </div>

                <div className="logout-btn" onClick={handleLogout}>
                    <div className='nav-btn logout'>
                        <RiLogoutCircleLine className='logout-icon'/>
                    </div>
                </div>
            </div>

            <div className="content">
                <input
                className='search-input'
                type="text"
                placeholder={`Search ${activeTab} ` }/>
    
                <ul>
                    {data.map(item => (
                        <li key={item._id.toString()}className='item-row'>
                                        <img
                src={'name' in item ? item.image : item.image}
                className="item-image"
            />{'username' in item ? item.username : 'channel_name' in item ? item.channel_name : ''}</li>
                    ))}
                </ul>
                <div className='my-profile'>
                    {user ? (
                        <>
                        <img src={user.image} />
                        <p>{user.username}</p>
                        </>
                    ): (
                        <p>Signed in as guest</p>
                    )}
                </div>
            </div>
        </div>
        </>
        
    )
}
