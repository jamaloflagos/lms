import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import GoBack from "../components/GoBack";

const UserLayout = ({ urlSegments }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header with Sidebar Toggle */}
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          urlSegments={urlSegments}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main
          className={`relative flex-1 bg-gray-100 overflow-y-auto transition-transform duration-300 ${
            isSidebarOpen ? "md:pl-64" : ""
          }`}
        >
          <div className="p-4">
            <GoBack />
          </div>
          {/* Main Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
