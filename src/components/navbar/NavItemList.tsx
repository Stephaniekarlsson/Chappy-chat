import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { useHandleChannelClick, useHandleDmUserClick } from "../../functions/NavFunctions.js";
import { useTabStore } from "../../data/tabStore.js";
import { useUserStore } from "../../data/UserStore.js";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { CreateChannelDialog } from "../channels/ChannelDialog.js";
import { User } from "../../api/userApi.js";
import DmDialog from "../dms/DmDialog.js";
import { filteredUsers } from "../../functions/userFunctions.js";


interface NavItemListProps {
  closeNavbar: () => void; 
}

export const NavItemList: React.FC<NavItemListProps> = ({ closeNavbar }) => {
  const data = useTabStore((state) => state.data); 
  const isAuthenticated = useUserStore((state) => state.isAuthenticated); 
  const setUsers = useUserStore((state) => state.setUsers); 
  const user = useUserStore((state) => state.user); 
  const activeTab = useTabStore((state) => state.activeTab);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDmDialogOpen, setIsDmDialogOpen] = useState(false)
  const { handleChannelClick } = useHandleChannelClick();
  const { handleDmUserClick } = useHandleDmUserClick();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const openDmDialog = async () => {
    if (user) { 
      setIsDmDialogOpen(true);
      const fetchedUsers = await filteredUsers(user._id);
      setUsers(fetchedUsers);
    }
  };

  const closeDmDialog = () => {
    setIsDmDialogOpen(false)
  }

  const startNewDm = (reciver: User) => {
    handleDmUserClick(reciver); 
    closeNavbar();
  };


  return (
    <>
    <ul>
      {data.map((item) => (
        <li
        key={("_id" in item) ? item._id.toString() : item.username}
        className={`item-row ${'isLocked' in item && item.isLocked && !isAuthenticated ? 'locked' : ''}`}
        onClick={() => {
          if (!("isLocked" in item) || !item.isLocked || isAuthenticated) {
            if ("username" in item) {
              handleDmUserClick(item); 
            } else {
              handleChannelClick(("_id" in item) ? item._id.toString() : ''); 
            }
            closeNavbar()
          }
        }}
      >
        <img 
          src={("image" in item) ? item.image : 'default-image-url.jpg'} 
          className="item-image" 
          alt="" 
        />
        {"username" in item ? item.username : item.channel_name}
        {("isLocked" in item) && (
          <span className="lock-icon">
            {item.isLocked ? (isAuthenticated ? <IoLockOpenOutline /> : <IoLockClosedOutline />) : null}
          </span>
        )}
      </li>
      ))}
    </ul>
      {activeTab === 'channels' && isAuthenticated && (
        <button className="add-channel-btn"
        onClick={openDialog}>
          <AiOutlinePlus className="add-channel-icon"/>
        </button>
      )}
      {activeTab === 'dms' && isAuthenticated && (
        <button className="add-new-dm" onClick={openDmDialog}>
          <AiOutlinePlus className="add-channel-icon"/>
        </button>
      )}

      {isDialogOpen && (
        <CreateChannelDialog closeDialog={closeDialog}/>
      )}

      {isDmDialogOpen && (
        <DmDialog closeDmDialog={closeDmDialog} startNewDm={startNewDm} />
      )}
    </>
  );
};
