import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="">
      <div className={`${isSidebarOpen ? "grid grid-cols-[1fr_3fr] grid-rows-[auto_1fr] h-screen" : ""}`}>
        {isSidebarOpen ? (
          <div className={`${isSidebarOpen ? "row-span-2" : ""} bg-blue-900 text-white`}>
            <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        ) : (
          <button onClick={() => setIsSidebarOpen((val) => !val)} className="absolute top-5 left-5">Open</button>
        )}
        <div className={`${isSidebarOpen ? "col-start-2" : ""}`}>
        <Header />
        </div>
        <main className={`${isSidebarOpen ? "col-start-2" : ""} h-full`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
