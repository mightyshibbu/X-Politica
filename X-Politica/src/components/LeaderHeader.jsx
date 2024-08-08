import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import '../css/style.css';
import '../css/swiper-bundle.min.css';
// import '../css/all.min.css';
// import '../css/aos.css';
// import '../css/bootstrap.min.css';
// import '../css/lightcase.css';

import logo1 from '../images/logo/logo.png';
import avatar from '../images/avatar.png'; // Import your avatar image

const LeaderHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);//CHANGE
    
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };
  
 function LogOut() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('user');
}
  const [userName,setUserName]=useState("Uncle John");
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    setUserName(JSON.parse(sessionStorage.getItem('user')).name)
    }, []);

  return (
    <div>
      <header className="header-section bg-color-3">
        <div className="header-bot tom">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo">
                <Link to="/homeL">
                  <img className="dark" src={logo1} alt="logo" />
                </Link>
              </div>
              <div className="menu-area">
                <ul className="menu menu--style">
                    <li>
                      Manage Claims
                      <ul className="submenu">
                        <li><Link to="/newclaim">New Claim</Link></li>
                        <li><Link to="index1-light.html">View Claims</Link></li>
                      </ul>
                    </li>
                  <li>
                   View
                    <ul className="submenu">
                      <li><Link to="/politicalparty">Political Party</Link></li>
                      <li><Link to="blogs.html">Stats</Link></li>
                      <li><Link to="blog-sidebar.html">Graph</Link></li>
                    </ul>
                  </li>
                  <li>
                    About
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
                        <a href="/profile">My Profile</a>
                        <a href="/" onClick={LogOut}>Log out</a>
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
