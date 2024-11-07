import '../../css/userDialog.css'
import { useUserStore } from "../../data/UserStore";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteUser, updateUser } from "../../api/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../api/userApi";
import { useTabStore } from "../../data/tabStore";
import { filteredUsers } from '../../functions/userFunctions';

interface UserDialogProps {
  closeDialog: () => void;
}

export const CreateUserDialog: React.FC<UserDialogProps> = ({
  closeDialog,
}) => {
  const user = useUserStore((state) => state.user) as User | null;
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const setUsers = useUserStore((state) => state.setUsers);
  const setData = useTabStore((state) => state.setData);
  const navigate = useNavigate();
  const [wantDelete, setWantDelete] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [image, setImage] = useState(user?.image || "");

  if (!user) return null;

  const handleDelete = async () => {
    try {
      await deleteUser(user._id);
      setMessage("Account deleted");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  const handleWantDelete = () => {
    setWantDelete(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedUserData = { username, image };
      await updateUser(user._id, updatedUserData);
      setUser({ ...user, username, image });
      setMessage("Profile updated successfully!");
      setIsEditingUsername(false);
      setIsEditingImage(false);
      const updatedUserList =  await filteredUsers(user._id);
      setUsers(updatedUserList);
      setData(updatedUserList);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating user:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <div className="user-dialog-overlay">
      <div className="user-dialog-container">
        <div className="dialog-img-container">
          <img className="profile-img" src={image} alt="profile" />
          {isEditingImage ? (
            <div className="edit-section">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Image URL"
                className="edit-input"
              />
              <button onClick={handleUpdate} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <div
              className="add-profile-img"
              onClick={() => setIsEditingImage(true)}
            >
              <AiOutlinePlus className="add-img-icon" />
            </div>
          )}
        </div>

        <div className="username-container">
          {isEditingUsername ? (
            <div className="edit-section">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-input"
              />
              <button onClick={handleUpdate} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <>
              <p className="dialog-username">{username}</p>
              <FaUserEdit onClick={() => setIsEditingUsername(true)} />
            </>
          )}
        </div>

        {error && <p className="dialog-message">{error}</p>}
        {message && <p className="dialog-message">{message}</p>}
        <div className="user-dialog-btn-container">
          <button className="user-display-btn" onClick={handleWantDelete}>
            Delete account
          </button>
          <button className="user-display-btn" onClick={closeDialog}>
            Close
          </button>
          {wantDelete && (
            <>
              <button className="user-display-btn" onClick={handleDelete}>
                Yes
              </button>
              <button className="user-display-btn" onClick={closeDialog}>
                No
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
