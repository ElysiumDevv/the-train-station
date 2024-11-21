import React, { useEffect, useState } from 'react';
import '../styles/ParallaxBackground.css';

const ParallaxBackground = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const imageUrl = `${process.env.PUBLIC_URL}/images/hero/hero-poster.jpg`;
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="parallax-section">
            <div 
                className="parallax-image" 
                style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    transform: `translateY(${scrollPosition * 0.5}px)`
                }}
                role="img"
                aria-label="Train Station venue background"
            />
            <div className="content-overlay" />
        </div>
    );
};

export default ParallaxBackground;
