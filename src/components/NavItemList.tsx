import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { useHandleChannelClick } from "../functions/NavFunctions";
import { useTabStore } from "../data/tabStore";
import { useUserStore } from "../data/UserStore";

export const NavItemList = () => {
  const data = useTabStore((state) => state.data); 
  const isAuthenticated = useUserStore((state) => state.isAuthenticated); 
  const { handleChannelClick } = useHandleChannelClick();

  return (
    <ul>
      {data.map((item) => (
        <li
          key={item._id.toString()}
          className={`item-row ${'isLocked' in item && item.isLocked && !isAuthenticated ? 'locked' : ''}`}
          onClick={() => {
            if (!("isLocked" in item) || !item.isLocked || isAuthenticated) {
              handleChannelClick(item._id.toString()); 
            }
          }}
        >
          <img src={item.image} className="item-image" alt="" />
          {"username" in item ? item.username : item.channel_name}
          {("isLocked" in item) && (
            <span className="lock-icon">
              {item.isLocked ? (isAuthenticated ? <IoLockOpenOutline /> : <IoLockClosedOutline />) : null}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};
