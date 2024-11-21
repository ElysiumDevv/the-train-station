import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      return () => video.removeEventListener('loadeddata', () => setVideoLoaded(true));
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <video
          id="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/core/hero-bg.jpg"
          className={videoLoaded ? 'loaded' : ''}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="gradient-overlay"></div>
      </div>

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Train Station
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-subtitle"
        >
          Appalachia's Home for Original Artists
        </motion.p>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/calendar" className="hero-button primary-button">
            View Events
          </Link>
          <Link to="/venue" className="hero-button secondary-button outlined">
            Explore the Venue
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
