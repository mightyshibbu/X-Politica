import  { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import Swiper from 'swiper';
import '../css/style.css'
import '../css/swiper-bundle.min.css'

import LeaderSwiper from './LeaderSwiper';

const CardTray = () => {
  const [leaders, setLeaders] = useState([]);

  const fetchLeaders = async () => {
    try {
      const response = await fetch('http://localhost:3080/getBestLeaders');
      const data = await response.json();
      console.log("data:",data)
      setLeaders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div>
      <LeaderSwiper leaders={leaders} />
    </div>
  );
};

export default CardTray;