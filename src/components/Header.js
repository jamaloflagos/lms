import { useState } from "react";
import { useGetNotificationsQuery } from "../features/notifications/notificationsApiSlice";
import NotificationsList from "../features/notifications/NotificationsList";
import useAuth from "../hooks/useAuth";

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { username } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const { notifications = [], ids } = useGetNotificationsQuery(undefined, {
    selectFromResult: (result) => ({
      notifications: Object.values(result?.data?.entities || {}).map(
        (notification) => ({
          id: notification.id,
          message: notification.message,
        })
      ),
      ids: result?.data?.ids || [],
    }),
  });

  return (
    <header
      className={`flex justify-between items-center p-4 bg-blue-600 text-white shadow`}
    >
      {/* Left Section: Sidebar Toggle Button and Username */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md bg-blue-800 hover:bg-blue-700 focus:outline-none md:hidden"
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          <i className={`fa-solid ${isSidebarOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>

        {/* Username */}
        <div className="font-bold text-lg">
          {username.charAt(0).toUpperCase() + username.slice(1)}
        </div>
      </div>

      {/* Right Section: Notifications, Messages, and Username Initial */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative focus:outline-none"
            aria-label="Notifications"
          >
            <i className="fa-regular fa-bell text-xl"></i>
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-10">
              <NotificationsList notifications={notifications} ids={ids} />
            </div>
          )}
        </div>

        {/* Messages */}
        <button
          aria-label="Messages"
          className="relative focus:outline-none"
        >
          <i className="fa-regular fa-envelope text-xl"></i>
        </button>

        {/* Username Initial */}
        <div className="h-10 w-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
          {username?.trim()[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
