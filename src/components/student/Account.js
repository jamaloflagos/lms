import { Outlet, Link } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const Account = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <div>
        <h3>Student name</h3>
        <div>
          <span>Student ID: {}</span>
          <span className="dot"></span>
          <span>Class: {}</span>
        </div>
      </div>
      <nav>
        <Link to={'my-details'}>My Details</Link>
        <Link to={'parent-details'}>Parent Info</Link>
        <Link to={'account-settings'}>Account Settings</Link>
        <Link to={'notification-settings'}>Notification Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
};
export default Account;
