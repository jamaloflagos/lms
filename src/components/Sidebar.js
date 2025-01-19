import { NavLink } from "react-router-dom";

const Sidebar = ({ urlSegments, setIsSidebarOpen, isSidebarOpen }) => {
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:shadow-lg`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 bg-blue-800">
          <span className="text-lg font-bold">School</span>
          <button
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="md:hidden"
          >
            <i className="fa-solid fa-times text-white"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-4 space-y-2">
          {urlSegments.map((segment, index) => (
            <NavLink
              key={index}
              to={segment}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive
                    ? "bg-white text-blue-900 font-bold"
                    : "hover:bg-blue-800"
                }`
              }
              onClick={closeSidebar}
            >
              {segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
