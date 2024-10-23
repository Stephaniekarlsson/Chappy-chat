import '../css/navbar.css'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState } from 'react';
import { RiMenu2Fill } from 'react-icons/ri';

type User = { id: number; name: string, img: string };
type Channel = { id: number; title: string, img: string};
type Dm = { id: number; name: string, img: string };

export const Navbar = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'channels' | 'dms'>('users');
    const [isOpen, setIsOpen] = 
    useState<boolean>(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const testData = {
        users: [
            { id: 1, name: 'User 1', img: '/path/to/user1.jpg'},
            { id: 2, name: 'User 2', img: '/path/to/user2.jpg'},
            { id: 3, name: 'User 3', img: '/path/to/user4.jpg'},
        ] as User[],
        channels: [
            { id: 1, title: 'Channel 1', img: '/path/to/user3.jpg' },
            { id: 2, title: 'Channel 2', img: '/path/to/user3.jpg' },
            { id: 3, title: 'Channel 3' , img: '/path/to/user3.jpg'},
        ] as Channel[],
        dms: [
            { id: 1, name: 'User 1', img: '/path/to/user3.jpg' },
            { id: 2, name: 'User 2', img: '/path/to/user3.jpg' },
            { id: 3, name: 'User 3', img: '/path/to/user3.jpg' },
        ] as Dm[],
    }

    const data = testData[activeTab];
    const user = {
        id:1,
        name: 'My username',
        img: '/path/to/profile3.jpg'
    }

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

                    <button
                        className={`nav-btn ${activeTab === 'dms' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dms')}
                    > DM </button>
                </div>

                <div className="logout-btn">
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
                        <li key={item.id}className='item-row'>
                                        <img
                src={'name' in item ? item.img : item.img}
                className="item-image"
            />{'name' in item ? item.name : item.title}</li>
                    ))}
                </ul>
                <div className='my-profile'>
                <img src={user.img} />
                <p>{user.name}</p>
            </div>
            </div>
        </div>
        </>
        
    )
}
