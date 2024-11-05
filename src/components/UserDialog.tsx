import '../css/userDialog.css'
import { useUserStore } from "../data/UserStore";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteUser } from '../api/userApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../api/userApi';


interface UserDialogProps {
  closeDialog: () => void;
}

export const CreateUserDialog: React.FC<UserDialogProps> =({closeDialog}) => {
  const user = useUserStore((state) => state.user) as User | null;
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate()
  const [wantDelete, setWantDelete] = useState(false)


  console.log('user data', user);
  
  

  if (!user) return null;

  const handleDelete = async () => {

    try {
      await deleteUser(user._id); 
      setMessage('Account deleted')
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false); 
      setUser(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    
    } catch (error) {
      setError('Failed to delete user. Please try again.'); 
      console.error('Error deleting user:', error);
    }
  };

  const handleWantDelete = () => {
    setWantDelete(true)
  }

  return (
    <div className="user-dialog-overlay">
      <div className="user-dialog-container">
          <div className="dialog-img-container">
            <img className='profile-img' src={user.image} alt="profile image" />
            <div className="add-profile-img">
              <AiOutlinePlus className='add-img-icon' />
            </div>
          </div>
          <div className="username-container">
            <p className='dialog-username'>{user.username}</p>
            <FaUserEdit />
          </div>
          {error && <p className="dialog-message">{error}</p>}
          {message && <p className="dialog-message">{message}</p>}
          <div className="user-dialog-btn-container">
            <button className="user-display-btn"
            onClick={handleWantDelete}>
              Delete account
            </button>
            <button className="user-display-btn"
            onClick={closeDialog}>
              Close
            </button>
            {wantDelete && (
              <>
                <button className="user-display-btn"
                onClick={handleDelete}>
                Yes
                </button>
                <button className="user-display-btn"
                onClick={closeDialog}>
                No
                </button>
              </>
            )}
          </div>
      </div>
    </div>
  );
};
