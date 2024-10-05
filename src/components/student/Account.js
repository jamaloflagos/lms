import { Outlet, NavLink } from "react-router-dom";
import { useStudent } from "../../hooks/useStudent";

const Account = () => {
  const { studentDetail } = useStudent();
  return (
    <div className="">
      <div className="bg-white pl-20">
        <h3>Student name</h3>
        <div>
          <span>Student ID: {}</span>
          <span className="dot"></span>
          <span>Class: {}</span>
        </div>
      </div>
      <nav className="flex space-x-4 bg-white mb-12 pt-12 pl-20">
        <NavLink
          to="my-details"
          className={({ isActive }) =>
            isActive ? "text-lp-blue{ type, amount, inputClasses }" : "text-grey-500 hover:underline"
          }
        >
          My Details
        </NavLink>
        <NavLink
          to="parent-details"
          className={({ isActive }) =>
            isActive ? "text-lp-blue" : "text-grey-500 hover:underline"
          }
        >
          Parent Info
        </NavLink>
        <NavLink
          to="account-settings"
          className={({ isActive }) =>
            isActive ? "text-lp-blue" : "text-grey-500 hover:underline"
          }
        >
          Account Settings
        </NavLink>
        <NavLink
          to="notification-settings"
          className={({ isActive }) =>
            isActive ? "text-lp-blue" : "text-grey-500 hover:underline"
          }
          F
        >
          Notification Settings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
export default Account;
