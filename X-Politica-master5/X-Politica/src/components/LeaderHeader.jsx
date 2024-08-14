import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/style.css';
import '../css/swiper-bundle.min.css';

import logo1 from '../images/logo/logo.png';
import avatar from '../images/avatar.png'; // Import your avatar image

const LeaderHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Default to closed

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const LogOut = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('data');
  };

  const [userName, setUserName] = useState("Uncle John");

  useEffect(() => {
    const user = sessionStorage.getItem('data');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "NO NAME");
      } catch (error) {
        console.error("Error parsing user from sessionStorage:", error);
        setUserName("NAME");
      }
    } else {
      setUserName("NAME");
    }
  }, []);

  return (
    <header className="bg-dark text-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center py-2">
          {/* Logo */}
          <div>
            <Link to="/homeL">
              <img className="img-fluid" src={logo1} alt="logo" style={{ maxHeight: '60px' }} />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/register">Register for Election</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manage Claims
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/newclaim">New Claim</Link></li>
                  <li><Link className="dropdown-item" to="index1-light.html">View Claims</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  View
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/politicalparty">Political Party</Link></li>
                  <li><Link className="dropdown-item" to="blogs.html">Stats</Link></li>
                  <li><Link className="dropdown-item" to="blog-sidebar.html">Graph</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  About
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="about.html">How to use</Link></li>
                  <li><Link className="dropdown-item" to="price.html">X-Politica</Link></li>
                  <li><Link className="dropdown-item" to="team-details.html">Team Details</Link></li>
                  <li><Link className="dropdown-item" to="contact.html">Contact Us</Link></li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* User Avatar and Dropdown */}
          <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="btn btn-secondary dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" aria-expanded="false">
              <img src={avatar} alt="Avatar" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
              <span>{userName}</span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                <li><a className="dropdown-item" href="/" onClick={LogOut}>Log out</a></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LeaderHeader;