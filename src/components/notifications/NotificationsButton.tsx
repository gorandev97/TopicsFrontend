import { useEffect, useRef, useState } from "react";
import NotificationIcon from "../../assets/icons/notification.png";
import { Notification } from "../../interfaces/interfaces";
import { useSocket } from "../../socket/useSocket";
import { NotificationsDropDown } from "./NotificationsDropDown";

type NotificationsButtonProps = {
  count: number;
  onClick: () => void;
  notifications?: Notification[];
};

export const NotificationsButton = (props: NotificationsButtonProps) => {
  const { count, onClick, notifications } = props;

  const { unreadCount, unreadNotifications } = useSocket(
    count,
    notifications ?? []
  );
  const [openDropDown, setIsDropdownOpen] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(count);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setIsDropdownOpen((prev) => !prev);
    onClick();
  };

  useEffect(() => {
    setTotalCount(totalCount + unreadCount);
  }, [unreadCount, totalCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative  w-10 h-10 mr-5">
      <img
        src={NotificationIcon}
        alt="Profile"
        className="w-10 h-10 rounded-full  mr-10 cursor-pointer relative"
        onClick={handleClick}
      />

      <div className="absolute top-0 right-0 rounded-full bg-red-900 text-white w-5 h-5 flex justify-center items-center">
        {unreadCount}
      </div>
      {openDropDown && (
        <NotificationsDropDown notifications={unreadNotifications} />
      )}
    </div>
  );
};
