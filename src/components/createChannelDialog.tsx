import '../css/channelDialog.css'
import { useState } from "react";
import { IoLockClosedOutline } from 'react-icons/io5';
import { createChannel } from '../api/channelApi';


interface ChannelDialogProps {
  closeDialog: () => void;
}


export const CreateChannelDialog: React.FC<ChannelDialogProps> =({closeDialog}) => {
  const [newChannelName, setNewChannelName] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const channelData = {
      channel_name: newChannelName,
      isLocked: isLocked,
    };

    console.log("Sending data:", JSON.stringify(channelData));
    console.log("Channel Data before sending:", channelData);

    try {
      await createChannel(channelData); 
      setNewChannelName("");
      setIsLocked(false);
      closeDialog(); 

    } catch (error) {
      console.error('Failed to create channel');
    }
  };


  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <h2>Create New Channel</h2>
        <form className='new-channel-form' onSubmit={handleSubmit}>
          <label>
            Channel Name:
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={isLocked}
              onChange={() => setIsLocked(!isLocked)}
            />
            <IoLockClosedOutline/>
          </label>
          <button className='channel-display-btn' type="submit">Create Channel</button>
          <button className='channel-display-btn' type="button"
          onClick={closeDialog}>Cancel</button>
        </form>
      </div>
    </div>
  );
};
