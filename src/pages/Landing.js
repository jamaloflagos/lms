import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Your School Name</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>

          <li
            onMouseEnter={() => handleMouseEnter('student')}
            onMouseLeave={handleMouseLeave}
          >
            <span>Student</span>
            {hoveredMenu === 'student' && (
              <ul className="dropdown">
                <li><Link to="/student/dashboard">Dashboard</Link></li>
                <li><Link to="/student/grades">Grades</Link></li>
                <li><Link to="/student/attendance">Attendance</Link></li>
              </ul>
            )}
          </li>

          <li
            onMouseEnter={() => handleMouseEnter('teacher')}
            onMouseLeave={handleMouseLeave}
          >
            <span>Teacher</span>
            {hoveredMenu === 'teacher' && (
              <ul className="dropdown">
                <li><Link to="/teacher/dashboard">Dashboard</Link></li>
                <li><Link to="/teacher/schedule">Schedule</Link></li>
                <li><Link to="/teacher/attendance">Attendance</Link></li>
              </ul>
            )}
          </li>

          <li
            onMouseEnter={() => handleMouseEnter('admin')}
            onMouseLeave={handleMouseLeave}
          >
            <span>Admin</span>
            {hoveredMenu === 'admin' && (
              <ul className="dropdown">
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/settings">Settings</Link></li>
                <li><Link to="/admin/reports">Reports</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/payments">Payments</Link></li>
        </ul>
      </nav>

      {/* School Info Section */}
      <section className="school-info">
        <div className="info-text">
          <h1>Welcome to Your School Name</h1>
          <p>
            Our school is committed to providing a high-quality education that fosters
            academic excellence, character development, and lifelong learning.
          </p>
          {/* <button className="cta-button"><Link className="cta-button" to="/apply/">Apply Now</Link></button> */}
          <Link className="cta-button" to="/apply/">Apply Now</Link>
        </div>
        <div className="info-image">
          <img src="path-to-your-image.jpg" alt="School" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <ul className="footer-links">
          <li><Link to="/about/principal">About the Principal</Link></li>
          <li><Link to="/about/school">About the School</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;
