import { useUserStore } from "../../data/UserStore.js";
import { useState } from "react";
import { CreateUserDialog } from "./UserDialog.js";

export const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="my-profile">
      {user ? (
        <div className="item-row" onClick={openDialog}>
          <img src={user.image} alt="User" />
          <p>{user.username}</p>
        </div>
      ) : (
        <p>Signed in as guest</p>
      )}

      {isDialogOpen && <CreateUserDialog closeDialog={closeDialog} />}
    </div>
  );
};
