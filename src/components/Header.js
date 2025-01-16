import { useState } from "react";
import { useGetNotificationsQuery } from "../features/notifications/notificationsApiSlice";
import NotificationsList from "../features/notifications/NotificationsList";
import useAuth from "../hooks/useAuth";

const Header = ({ isSidebarOpen }) => {
  const { username } = useAuth();
  const [showNotifications, setShowNotifcations] = useState(false);
  const { notifications = [], ids } = useGetNotificationsQuery(undefined, {
    selectFromResult: (result) => ({
      notifications: Object.values(result?.data?.entities || {}).map(
        (notification) => ({
          id: notification.id,
          message: notification.message,
        })
      ),
      ids: result?.data?.ids,
    }),
  });

  return (
    <header className={`${isSidebarOpen ? "col-start-2" : ""}`}>
      <div>
        <h1>{username.charAt(0).toUpperCase() + username.slice(1)}</h1>
      </div>
      <div>
        <div onClick={() => setShowNotifcations(prev => !prev)}>
          <span>notification</span>
          <span>{notifications.length}</span>
        </div>
        <span>message</span>
        <span>{username?.trim()[0]?.toUpperCase()}</span>
      </div>
      {showNotifications && (
        <NotificationsList
          notifications={notifications}
          ids={ids}
        />
      )}
    </header>
  );
};
export default Header;
