import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
    return (
        <motion.section 
            className="about-section"
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <motion.div 
                className="about-content"
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h2>About The Train Station</h2>
                <p>Welcome to The Train Station, where music comes alive and memories are made. Our venue has been the heart of the local music scene, hosting both emerging artists and established acts in an intimate and vibrant atmosphere.</p>
                
                <div className="features">
                    <motion.div 
                        className="feature"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Capacity</h3>
                        <p>500+ standing</p>
                    </motion.div>
                    
                    <motion.div 
                        className="feature"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Sound System</h3>
                        <p>State-of-the-art</p>
                    </motion.div>
                    
                    <motion.div 
                        className="feature"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3>Bar Service</h3>
                        <p>Full-service bar</p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default About;
