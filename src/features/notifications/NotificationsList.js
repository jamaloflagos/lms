import { useMarkReadMutation } from "./notificationsApiSlice";

const NotificationsList = ({ notifications = [], ids }) => {
  const [markRead, { isSuccess }] = useMarkReadMutation();

  const markAllAsRead = async () => {
    await markRead([...ids]);
  };

  const markSingleAsRead = async (id) => {
    await markRead([id]);
  };

  return (
    <div className="p-4">
      {notifications.length > 0 ? (
        <>
          <button
            onClick={markAllAsRead}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
          >
            Mark All as Read
          </button>
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification.id} className="py-2 flex justify-between items-center">
                <p className="text-sm">{notification.message}</p>
                <button
                  onClick={() => markSingleAsRead(notification.id)}
                  className="text-blue-600 text-xs underline"
                >
                  Mark as Read
                </button>
              </li>
            ))}
          </ul>
          {isSuccess && (
            <p className="text-green-500 text-sm mt-2">Notifications marked as read</p>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-sm">No new notifications</p>
      )}
    </div>
  );
};

export default NotificationsList;
