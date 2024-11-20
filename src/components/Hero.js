import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
  const [videoUrl, setVideoUrl] = useState('/videos/hero-bg.mp4');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="hero-container">
      {/* Video or Image background */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Fallback image while video loads */}
      {!isVideoLoaded && (
        <div 
          className="hero-image" 
          style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/core/hero-bg.jpg)` 
          }} 
        />
      )}

      {/* Dark overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Train Station
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Where Music Comes Alive
        </motion.p>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            className="primary-button"
            onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
          >
            View Events
          </button>
          <button 
            className="secondary-button"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Book Venue
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="scroll-text">Scroll to explore</div>
        <div className="scroll-arrow"></div>
      </motion.div>
    </div>
  );
};

export default Hero;
