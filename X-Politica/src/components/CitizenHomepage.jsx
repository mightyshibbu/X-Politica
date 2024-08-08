import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Corousel from './Corousel';
import CardTray from './CardTray';
import Header from './Header';

function CitizenHomepage() {
  const location = useLocation();
  const navigate = useNavigate();
  // State to manage whether the alert has been shown
  const [alertShown, setAlertShown] = useState(false);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Assuming you store login state in sessionStorage
    if (!isLoggedIn) {
      if (!alertShown) {
        alert("Log in first!");
        setAlertShown(true); // Mark the alert as shown
      }
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [navigate, alertShown]); // Include alertShown in dependency array

  return (
    <>
      <Header/>
      <Corousel/>
      <CardTray/>
    </>
  );
}

export default CitizenHomepage;
