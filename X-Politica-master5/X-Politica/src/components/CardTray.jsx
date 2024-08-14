import  { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import Swiper from 'swiper';
import '../css/style.css'
import '../css/swiper-bundle.min.css'
import bgImage from '../images/blog/bg.png';
import img3 from "../images/blog/3.png";
import img1 from "../images/blog/1.png";
import img2 from "../images/blog/2.png";
import imgauth3 from "../images/blog/author/3.png"; 
import imgauth2 from "../images/blog/author/2.png"; 
import imgauth1 from "../images/blog/author/1.png"; 

function CardTray() {
  useEffect(() => {
    const blogSlider = new Swiper('.blog__slider', {
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      slidesPerView: 1,
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        }
      },

      autoplay: true,
      speed: 500,
      navigation: {
        nextEl: ".blog__slider-next",
        prevEl: ".blog__slider-prev",
      },
    });
  }, []);
    return (
    <>
       <section className="blog padding-top padding-bottom bg-color">
    <div className="blog__bg">
      <div className="blog__bg-element">
        <img src={bgImage} alt="section-bg-element" className="dark"/>
      </div>
    </div>
    <div className="container">
      <div className="blog__wrapper" data-aos="fade-up" data-aos-duration="1000">
        <div className="blog__slider swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="blog__item blog__item--style2">
                <div className="blog__item-inner">
                  <div className="blog__thumb">
                    <img className="hello" src={img1} alt="blog Images"/>
                  </div>

                  <div className="blog__content">
                    <div className="blog__meta">
                      <span className="blog__meta-tag blog__meta-tag--style1">Forex trading</span>
                    </div>
                    <h5 className="10"> <Link to="blog-details.html">Swing Trading Definition</Link> </h5>

                    <p className="mb-15">Our platform is not only about trading—it's also Link hub for knowledge and learning.
                      We provide resources.</p>

                    <div className="blog__writer">
                      <div className="blog__writer-thumb">
                        <img src={imgauth1} alt="writer"/>
                      </div>
                      <div className="blog__writer-designation">
                        <h6 className="mb-0">Vasha Gueye</h6>
                        <span>20/6/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="blog__item blog__item--style2">
                <div className="blog__item-inner">
                  <div className="blog__thumb">
                    <img src={img2} alt="blog Images"/>
                  </div>

                  <div className="blog__content">
                    <div className="blog__meta">
                      <span className="blog__meta-tag blog__meta-tag--style1">Trading market</span>
                    </div>
                    <h5 className="10"> <Link to="blog-details.html">hedge funds work?</Link> </h5>

                    <p className="mb-15">To cater to your individual trading preferences, we offer Link variety of order types,
                      including market.</p>

                    <div className="blog__writer">
                      <div className="blog__writer-thumb">
                        <img src={imgauth2} alt="writer"/>
                      </div>
                      <div className="blog__writer-designation">
                        <h6 className="mb-0">Abhivibha Kanmani</h6>
                        <span>30/5/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="blog__item blog__item--style2">
                <div className="blog__item-inner">
                  <div className="blog__thumb">
                    <img src={img3} alt="blog Images"/>
                  </div>

                  <div className="blog__content">
                    <div className="blog__meta">
                      <span className="blog__meta-tag blog__meta-tag--style1">Investment</span>
                    </div>
                    <h5 className="10"> <Link to="blog-details.html">Options Trading business?</Link> </h5>

                    <p className="mb-15">Security is our top priority, and we employ robust measures to ensure the safety of
                      your funds.</p>

                    <div className="blog__writer">
                      <div className="blog__writer-thumb">
                        <img src={imgauth3} alt="writer"/>
                      </div>
                      <div className="blog__writer-designation">
                        <h6 className="mb-0">Hulya Aydin</h6>
                        <span>12/07/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="blog__item blog__item--style2">
                <div className="blog__item-inner">
                  <div className="blog__thumb">
                    <img src={img3} alt="blog Images"/>
                  </div>
                  <div className="blog__content">
                    <div className="blog__meta">
                      <span className="blog__meta-tag blog__meta-tag--style1">Investment</span>
                    </div>
                    <h5 className="10"> <Link to="blog-details.html">Options Trading business?</Link> </h5>

                    <p className="mb-15">Security is our top priority, and we employ robust measures to ensure the safety of
                      your funds.</p>

                    <div className="blog__writer">
                      <div className="blog__writer-thumb">
                        <img src={imgauth3} alt="writer"/>
                      </div>
                      <div className="blog__writer-designation">
                        <h6 className="mb-0">Hulya Aydin</h6>
                        <span>12/07/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link to="blogs.html" className="trk-btn trk-btn--border trk-btn--primary mt-40">View more </Link>
      </div>
    </div>
  </section>
    </>
  )
}
export default CardTray;