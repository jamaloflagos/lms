import { NavLink } from "react-router-dom";

const Sidebar = ({ urlSegments, setIsSidebarOpen, isSidebarOpen }) => {
  const onClick = () => setIsSidebarOpen((val) => !val);
  const links = urlSegments.map((segment, index) => (
    <NavLink
    key={index}
      to={segment}
      className={({ isActive }) =>
        isActive
          ? "bg-white text-blue-900 rounded-md px-4 py-2"
          : "bg-transparent"
      }
    >
      {segment.charAt(0).toUpperCase() + segment.slice(1)}
    </NavLink>
  ));

  const content = (
    <aside className={`${isSidebarOpen ? "row-span-2" : ""} bg-blue-900 text-white`}>
      <div className="flex justify-between px-4 py-3 text-black">
        <span className="text-lg font-bold">School</span>
        <i className="fa-solid fa-chevron-left" onClick={onClick}></i>
      </div>
      <nav>{links}</nav>
    </aside>
  );

  return content;
};
export default Sidebar;
