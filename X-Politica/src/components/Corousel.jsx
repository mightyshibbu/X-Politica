import React from 'react'
import { useState } from 'react';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "../static/img1.jpeg";
import 'bootstrap/dist/css/bootstrap.css';
function Corousel() {
  return (
    <div>
      <Carousel>
      <Carousel.Item interval={1000}>
        <img src={img1} alt="First slide" style={{
          width: '100vw',
          height: '72vh',
          objectFit: 'cover'
        }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img src={img1} alt="Second slide" style={{
          width: '100%',
          height: '72vh',
          objectFit: 'cover'
        }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={img1} alt="Third slide" style={{
          width: '100%',
          height: '72vh',
          objectFit: 'cover'
        }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Corousel
