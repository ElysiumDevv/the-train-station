import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/VenueInfo.css';

const VenueInfo = () => {
    const venueImages = [
        {
            src: "/images/venue/exterior-day.png",
            alt: "The Train Station exterior during day",
            title: "Historic Venue"
        },
        {
            src: "/images/venue/main-stage.png",
            alt: "Main performance stage",
            title: "Professional Stage"
        },
        {
            src: "/images/venue/seating-area.jpg",
            alt: "Comfortable seating area",
            title: "Spacious Seating"
        },
        {
            src: "/images/venue/exterior-night.jpg",
            alt: "The Train Station at night",
            title: "Evening Ambiance"
        }
    ];

    const venueFeatures = [
        {
            title: "Main Stage",
            description: "Professional sound system and lighting for unforgettable performances.",
            icon: "🎭",
            color: "#9B5DE5"
        },
        {
            title: "Capacity",
            description: "Spacious venue accommodating up to 500 guests across two floors.",
            icon: "👥",
            color: "#F15BB5"
        },
        {
            title: "Amenities",
            description: "Full kitchen, private lounge, pool tables, and professional equipment.",
            icon: "✨",
            color: "#00BBF9"
        },
        {
            title: "Events",
            description: "Perfect for concerts, weddings, private parties, and community gatherings.",
            icon: "🎉",
            color: "#00F5D4"
        }
    ];

    return (
        <motion.section 
            className="venue-info-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="section-title"
            >
                Our Venue
            </motion.h2>
            
            <motion.p 
                className="venue-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                The Train Station is more than a venue; it's a cultural landmark in Corbin. 
                From our dedication to Appalachian music to innovative projects like The Dark Room 
                and live recording capabilities, we bridge tradition with modern entertainment.
            </motion.p>

            <div className="venue-gallery">
                {venueImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="venue-image-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                            duration: 0.5,
                            delay: index * 0.2,
                            ease: "easeOut"
                        }}
                    >
                        <img 
                            src={image.src} 
                            alt={image.alt}
                            className="venue-image"
                        />
                        <div className="image-overlay">
                            <h3>{image.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="features-grid">
                {venueFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="feature-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                            duration: 0.5,
                            delay: index * 0.2,
                            ease: "easeOut"
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            borderColor: feature.color
                        }}
                    >
                        <div className="feature-content">
                            <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="venue-cta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Link to="/contact" className="primary-button">Book the Venue</Link>
            </motion.div>
        </motion.section>
    );
};

export default VenueInfo;
