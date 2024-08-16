import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Corousel from './Corousel';
import CardTray from './CardTray';
import Header from './Header';

function CitizenHomepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get the JWT token from sessionStorage
    if (!token) {
        alert("Log in first!");
        navigate('/'); // Redirect to the login page if not logged in
    } else {
        try {
            const base64Url = token.split('.')[1]; // Get the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const parsedToken = JSON.parse(jsonPayload);
            const name = parsedToken.user.name; // Extract the name from the token
            setName(name);
            console.log("Name extracted from token:", name);
        } catch (error) {
            console.error("Invalid token:", error);
            alert("Invalid session. Please log in again.");
            sessionStorage.removeItem('token'); // Clear the invalid token
            navigate('/'); // Redirect to the login page
        }
    }
  }, [navigate]);

  return (
    <>
      <Header name={name} />
      <Corousel/>
      <CardTray/>
    </>
  );
}

export default CitizenHomepage;
