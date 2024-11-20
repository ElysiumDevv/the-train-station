import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="hero" id="home">
            <div className="video-container">
                <video autoPlay muted loop playsInline className="background-video">
                    <source 
                        src="https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-concert-1462-large.mp4" 
                        type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay"></div>
            </div>

            <div className="hero-content">
                <motion.div
                    className="text-content"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.3
                            }
                        }
                    }}
                >
                    <motion.h1 variants={textVariants}>
                        THE TRAIN STATION
                    </motion.h1>
                    <motion.p variants={textVariants}>
                        Where Music Comes Alive
                    </motion.p>
                    <motion.div 
                        className="cta-buttons"
                        variants={textVariants}
                    >
                        <motion.button
                            className="primary-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Events
                        </motion.button>
                        <motion.button
                            className="secondary-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Book Venue
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="scroll-indicator"
                    animate={{ 
                        y: [0, 10, 0],
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
