import '../../css/dmDialog.css'
import React from 'react';
import { useUserStore } from '../../data/UserStore.js';
import { User } from '../../api/userApi.js';
import { getDmUserInfo } from '../../functions/userFunctions.js';

interface NewDmProps {
  closeDmDialog: () => void;
  startNewDm: (reciver: User) => void;
}

const DmDialog: React.FC<NewDmProps> = ({ closeDmDialog, startNewDm }) => {
  const users = useUserStore((state) => state.users);

  const handleStartChat = (user: User) => {
      startNewDm(user);
      closeDmDialog();
  };

  const getImage = (username: string) => {
    const { image } = getDmUserInfo(username);
    return image
  };

  return (
    <div className="dm-overlay">
      <div className="new-dm-dialog">
        <h2>Select a user to start a conversation</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => handleStartChat(user)}>
              <div className="dm-user-info">
                  <img 
                  src={getImage(user.username)} 
                  alt={user.username} 
                  className="user-image" 
                />
                {user.username}
              </div>
            </li>
          ))}
        </ul>
        <button onClick={closeDmDialog}>Cancel</button>
      </div>
    </div>
  );
};

export default DmDialog;
