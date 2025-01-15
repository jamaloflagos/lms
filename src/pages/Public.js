import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Public = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <>
      <header
        className={`absolute top-0 left-0 h-full w-fit sm:w-full sm:h-fit bg-yellow`}
      >
        <button
          className={`absolute top-5 ${
            isSidebarOpen ? "right-0" : "left-5"
          } sm:hidden`}
          onClick={() => setIsSidebarOpen((val) => !val)}
        >
          Menu
        </button>

        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } mt-12 w-52 pl-2 sm:w-full sm:p-2 sm:mt-0 sm:flex justify-between`}
        >
          <Link to="/">
            <h1 className="navbar-brand">Your School Name</h1>
          </Link>
          <nav className="w-96">
            <ul className="sm:flex justify-between">
              <li className="relative">
                <Link to="/">Home</Link>
              </li>

              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("student")}
                onMouseLeave={handleMouseLeave}
              >
                <span>Student</span>
                {hoveredMenu === "student" && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/student/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/student/grades">Grades</Link>
                    </li>
                    <li>
                      <Link to="/student/attendance">Attendance</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("teacher")}
                onMouseLeave={handleMouseLeave}
              >
                <span>Teacher</span>
                {hoveredMenu === "teacher" && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/teacher/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/teacher/schedule">Schedule</Link>
                    </li>
                    <li>
                      <Link to="/teacher/attendance">Attendance</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li
                className="relative"
                onMouseEnter={() => handleMouseEnter("admin")}
                onMouseLeave={handleMouseLeave}
              >
                <span>Admin</span>
                {hoveredMenu === "admin" && (
                  <ul className="dropdown">
                    <li>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/admin/settings">Settings</Link>
                    </li>
                    <li>
                      <Link to="/admin/reports">Reports</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <Link to="/payment">Payments</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="p-12 sm:pt-24">
        <article className="sm:flex gap-10">
          <section className="mb-4 sm:w-2/4">
            <h1>
              Welcome to <span className="font-bold">My School</span>
            </h1>
            <p className="my-4">
              Our school is committed to providing a high-quality education that
              fosters academic excellence, character development, and lifelong
              learning.
            </p>
            {/* <button className="cta-button"><Link className="cta-button" to="/apply/">Apply Now</Link></button> */}
            <Link
              className="text-white bg-md-blue p-3 rounded-md block w-fit"
              to="application"
            >
              Apply Now
            </Link>
          </section>
          <div className="sm:w-2/4">
            <img
              className=""
              src="data:image/jpeg;base64,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"
              alt="School"
            />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default Public;
