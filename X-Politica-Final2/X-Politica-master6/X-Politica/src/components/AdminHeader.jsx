import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import '../css/swiper-bundle.min.css';
import logo1 from '../images/logo/logo.png';
import avatar from '../images/avatar.png'; // Import your avatar image

const LogOut = () => {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('data');
};

const AdminHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("NAME");

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "NO NAME");
      } catch (error) {
        console.error("Error parsing user from sessionStorage:", error);
      }
    } else {
      setUserName("NAME");
    }
  }, []);

  return (
    <header className="header-section bg-color-3">
      <div className="header-bot tom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/homeC">
                <img className="dark" src={logo1} alt="logo" />
              </Link>
            </div>
            <div className="menu-area">
              <ul className="menu menu--style">
                <li><Link to="/electionDeclare">Declare Election</Link></li>
                <li><Link to="/winner">Determine Winner</Link></li>
                <li><Link to="/" onClick={LogOut}>Log out</Link></li>
              </ul>
            </div>
            <div className="header-action">
              <div className="menu-area">
                <div
                  className="dropdown"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="avatar-btn">
                    <img src={avatar} alt="Avatar" className="avatar-img" />
                    <span className="username">{userName}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      <Link to="/profile">My Profile</Link>
                      <Link to="/" onClick={LogOut}>Log out</Link>
                    </div>
                  )}
                </div>
                <div className="header-bar d-lg-none home1">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;