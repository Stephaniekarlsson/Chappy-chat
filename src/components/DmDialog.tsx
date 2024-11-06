import '../css/dmDialog.css';
import React, { useState } from 'react';
import { useUserStore } from '../data/UserStore.js';
import { User } from '../api/userApi.js';

interface NewDmProps {
  closeDmDialog: () => void;
  startNewDm: (reciver: User) => void;
}

const DmDialog: React.FC<NewDmProps> = ({ closeDmDialog, startNewDm }) => {
  const users = useUserStore((state) => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleStartChat = () => {
    if (selectedUser) {
      startNewDm(selectedUser);
      closeDmDialog();
    }
  };

  return (
    <div className="dm-overlay">
      <div className="new-dm-dialog">
        <h2>Select a user to start a conversation</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => handleSelectUser(user)}>
              {user.username}
            </li>
          ))}
        </ul>
        {selectedUser && (
          <div>
            <h3>You selected: {selectedUser.username}</h3>
            <button onClick={handleStartChat}>Start DM</button>
          </div>
        )}
        <button onClick={closeDmDialog}>Cancel</button>
      </div>
    </div>
  );
};

export default DmDialog;
