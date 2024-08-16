import React from 'react'
import { useState } from 'react';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../static/img1.png";
import img2 from "../static/img2.png";
import img3 from "../static/img3.png";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
function Corousel() {
  return (
    <div>
      <Carousel>
      <Carousel.Item interval={1000}>
        <img className="mycorousel" src={img1} alt="First slide"  />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img className="mycorousel" src={img2} alt="Second slide" />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img className="mycorousel" src={img3} alt="Third slide" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Corousel
