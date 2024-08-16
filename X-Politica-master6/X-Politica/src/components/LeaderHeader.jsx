import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import '../css/swiper-bundle.min.css';
import logo1 from '../images/logo/logo.png';
import avatar from '../images/avatar.png'; // Import your avatar image

const LeaderHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("Uncle John");

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  function LogOut() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('data');
  }

  useEffect(() => {
    const user = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : sessionStorage.getItem('data');
    if (user) {
      try {
        console.log("User:", user);
        const parsedUser = JSON.parse(user);
        console.log("parsedUser Name:", parsedUser.name);
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
    <div>
      <header className="header-section bg-color-3">
        <div className="header-bottom">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo">
                <Link to="/homeL">
                  <img className="dark" src={logo1} alt="logo" />
                </Link>
              </div>
              <div className="menu-area">
                <ul className="menu menu--style">
                  <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ textDecoration: 'underline' }}>Register for Election</Link>
                  </li>
                  <li>
                    <Link to="#0">Manage Claims</Link>
                    <ul className="submenu">
                      <li><Link to="/newclaim">New Claim</Link></li>
                      <li><Link to="/viewclaimsleader">View Claims</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#0">View</Link>
                    <ul className="submenu">
                      <li><Link to="/politicalparty">Political Party</Link></li>
                      <li><Link to="blogs.html">Stats</Link></li>
                      <li><Link to="blog-sidebar.html">Graph</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#0">About</Link>
                    <ul className="submenu">
                      <li><Link to="about.html">How to use</Link></li>
                      <li><Link to="price.html">X-Politica</Link></li>
                      <li><Link to="team-details.html">Team Details</Link></li>
                      <li><Link to="contact.html">Contact Us</Link></li>
                    </ul>
                  </li>
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
                        <Link to="/leaderprofile">My Profile</Link>
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
    </div>
  );
};

export default LeaderHeader;