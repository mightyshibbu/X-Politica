import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Corousel from '../components/Corousel';
import CardTray from '../components/CardTray';
import LeaderHeader from '../components/LeaderHeader';
import { useNavigate, useLocation } from 'react-router-dom'; 

function LeaderHomepage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { Name } = location.state || { Name: "NAME" }; // Provide default value if state is undefined
    // Check if user is logged in using sessionStorage
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Assuming you store login state in sessionStorage
    if (!isLoggedIn) {
        alert("Log in first!")
      navigate('/'); // Redirect to the login page if not logged in
    }
  }, [navigate]);
    return (
        <>
            <LeaderHeader Name={Name} />
            <Corousel />
            <CardTray />
        </>
    );
}
export default LeaderHomepage;
