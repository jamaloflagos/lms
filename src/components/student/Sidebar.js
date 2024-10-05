import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="sticky top-0 h-screen">
      {showSidebar ? (
        <div className="bg-blue-900 text-white w-56 h-full">
          <div className="flex justify-between px-4 py-3">
            <span className="text-lg font-bold">LMS</span>
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => setShowSidebar((prev) => !prev)}
            ></i>
          </div>
          <nav className="flex flex-col space-y-4 px-4 py-2  sticky top-0">
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-blue-900 rounded-md px-4 py-2"
                  : "bg-transparent"
              }
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21H3m0-6l6-6m0 6l6-6"
                  />
                </svg>
                Dashboard
              </div>
            </NavLink>
            <NavLink
              to="curriculum"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-blue-900 rounded-md px-4 py-2"
                  : "bg-transparent"
              }
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l0 0 3 3 3-3z"
                  />
                </svg>
                Curriculum
              </div>
            </NavLink>
            <NavLink
              to="reports"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-blue-900 rounded-md px-4 py-2"
                  : "bg-transparent"
              }
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v12l-5-3-5 3v-12l5-3 5 3z"
                  />
                </svg>
                Reports
              </div>
            </NavLink>
            <NavLink
              to="account"
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-blue-900 rounded-md px-4 py-2"
                  : "bg-transparent"
              }
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l-2-2m0 0l-2-2m2-2l2-2m-2-2l-2-2m2-2l2-2"
                  />
                </svg>
                Account
              </div>
            </NavLink>
            <NavLink to={"groups"}>Study group</NavLink>
          </nav>
        </div>
      ) : (
        <div className="w-12 fixed top-0 left-0">
          <i
            class="fa-solid fa-bars"
            onClick={() => setShowSidebar((prev) => !prev)}
          ></i>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
