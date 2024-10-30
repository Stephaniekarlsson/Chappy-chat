import { useUserStore } from "../data/UserStore";

export const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="my-profile">
      {user ? (
        <div className="item-row">
          <img src={user.image} alt="User" />
          <p>{user.username}</p>
        </div>
      ) : (
        <p>Signed in as guest</p>
      )}
    </div>
  );
};
