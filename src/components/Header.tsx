import { getDecodedToken } from "../helper/token";
import Logo from "../assets/logo/convo_cloud_logo-removebg-noBackground.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsButton } from "./notifications/NotificationsButton";
import {
  useGetNotifications,
  useUpdateNotifications,
} from "../api/notifications";
import { Notification } from "../interfaces/interfaces";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = getDecodedToken();
  const [notificationsData, setNotificationsData] = useState<{
    count: number;
    notifications: Notification[];
  }>();
  const { data, isSuccess, refetch } = useGetNotifications();
  const { mutate, isSuccess: isNotificationsUpdateSuccess } =
    useUpdateNotifications();
  const handleNotificationsClick = () => {
    mutate();
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const confirmLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handleOptionClick = (option: string) => {
    switch (option) {
      case "My Profile":
        setIsDropdownOpen(false);
        navigate("/my-profile");
        break;
      case "My Topics":
        setIsDropdownOpen(false);
        navigate("/my-topics");
        break;
      case "Logout":
        handleLogoutClick();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setNotificationsData(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isNotificationsUpdateSuccess) {
      refetch();
    }
  }, [isNotificationsUpdateSuccess, refetch]);

  return (
    <div className="w-full h-20 bg-gradient-to-b from-blue-200 to-white flex flex-row justify-between items-center">
      <img
        src={Logo}
        alt="ConvoCloud Logo"
        className="w-20 h-20 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />

      <h1 className="text-5xl font-extrabold leading-tight text-white hidden drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:block ml-16">
        ConvoCloud
      </h1>
      <div className="flex flex-row justify-center items-center">
        <NotificationsButton
          count={notificationsData?.count ?? 0}
          notifications={notificationsData?.notifications}
          onClick={handleNotificationsClick}
        />
        <div className="relative">
          <img
            src={user?.profilePicture}
            alt="Profile"
            className="w-14 h-14 rounded-full bg-blue-500 my-3 mr-10 cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick("My Profile")}
                >
                  My Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick("My Topics")}
                >
                  My Topics
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  onClick={() => handleOptionClick("Logout")}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={confirmLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
