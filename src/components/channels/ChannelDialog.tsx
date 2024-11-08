import '../../css/channelDialog.css'
import { useState } from "react";
import { IoLockClosedOutline } from 'react-icons/io5';
import { createChannel } from '../../api/channelApi';
import { fetchChannels } from '../../api/channelApi';
import { useChannelStore } from '../../data/channelStore';
import { useTabStore } from '../../data/tabStore';


interface ChannelDialogProps {
  closeDialog: () => void;
}


export const CreateChannelDialog: React.FC<ChannelDialogProps> =({closeDialog}) => {
  const setChannels = useChannelStore((state) => state.setChannels);
  const setData = useTabStore((state) => state.setData);
  const [newChannelName, setNewChannelName] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [channelImage, setChannelImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const channelData = {
      channel_name: newChannelName,
      isLocked: isLocked,
      image: channelImage || undefined
    };

    try {
      await createChannel(channelData); 
      const updatedChannels = await fetchChannels(); 
      setChannels(updatedChannels);
      setData(updatedChannels);
      setNewChannelName("");
      setIsLocked(false);
      setChannelImage(""); 
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
          <div className="channel-input-container">
            <label>
              Channel Name:
            </label>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              required
              />
          </div>
          <div className="channel-input-container">
            <label>
              Image:
            </label>
            <input
              type="text"
              placeholder="Image-URL (optionally)"
              value={channelImage}
              onChange={(e) => setChannelImage(e.target.value)}
              />
          </div>
   
          <div className="lock-channel-container">
            <p>Lock channel</p>
            <IoLockClosedOutline className='channel-lock-icon'/>
            <input
              type="checkbox"
              className='channel-checkbox'
              checked={isLocked}
              onChange={() => setIsLocked(!isLocked)}
              />
          </div>
       
          <button className='channel-btn' type="submit">Create Channel</button>
          <button className='channel-btn' type="button"
          onClick={closeDialog}>Cancel</button>
        </form>
      </div>
    </div>
  );
};
