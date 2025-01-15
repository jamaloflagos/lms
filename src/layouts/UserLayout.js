import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";

const UserLayout = ({ urlSegments }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={`${isSidebarOpen ? "grid grid-cols-[1fr_3fr] grid-rows-[auto_1fr] h-screen" : "h-screen relative"}`}>
      {isSidebarOpen ? (
        <Sidebar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          urlSegments={urlSegments}
        />
      ) : (
        <button
          onClick={() => setIsSidebarOpen((val) => !val)}
          className="absolute top-5 left-5"
        >
          Open
        </button>
      )}
      <Header isSidebarOpen={isSidebarOpen} />
      <main className={`${isSidebarOpen ? "col-start-2" : ""} h-full`}>
        <Outlet />
      </main>
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
};
export default UserLayout;
