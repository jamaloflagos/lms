import { useMarkReadMutation } from "./notificationsApiSlice";

const NotificationsList = ({ notifications = [], ids }) => {
  const [markRead, { isSuccess }] = useMarkReadMutation();

  const markAllAsRead = async () => {
    await markRead([...ids]);
  };

  const markSingleAsRead = async (id) => {
    await markRead([id]);
  };

  const listItems = notifications.map((notification) => (
    <li>
      <p>{notification.message}</p>
      <button onClick={markSingleAsRead(notification.id)}>Mark as Read</button>
    </li>
  ));

  return (
    <>
      {notifications?.length > 0 ? (
        <div>
          <button onClick={markAllAsRead}>Mark All as Read</button>
          <ul>{listItems}</ul>
          {isSuccess && <p>success</p>}
        </div>
      ) : (
        <p>No new notifications</p>
      )}
    </>
  );
};
export default NotificationsList;
