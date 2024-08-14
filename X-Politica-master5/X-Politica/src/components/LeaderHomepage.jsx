import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Corousel from '../components/Corousel';
import CardTray from '../components/CardTray';
import LeaderHeader from '../components/LeaderHeader';
import { useNavigate } from 'react-router-dom'; 

function LeaderHomepage() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Get the JWT token from sessionStorage
        if (!token) {
            alert("Log in first!");
            navigate('/'); // Redirect to the login page if not logged in
        } else {
            try {
                console.log("Token hai...")
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
            <LeaderHeader/>
            <Corousel />
            <CardTray />
        </>
    );
}

export default LeaderHomepage;
