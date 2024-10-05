import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useStudent } from "../../hooks/useStudent";

const Layout = () => {
  const { studentDetail } = useStudent();
  return (
    <div>
      <div className="flex h-screen bg-lp-blue  overflow-y-auto relative">
        <Sidebar />
        <div className="flex-grow">
          <div className="bg-white flex justify-between px-12 h-12 pt-2 sticky top-0">
            <h4>{studentDetail.first_name}</h4>
            <i class="fa-solid fa-bell"></i>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
