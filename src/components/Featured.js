import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Featured.css';

const Featured = () => {
    const cards = [
        {
            title: "Live Music Hub",
            description: "Experience the best of local and regional talent in our historic venue. From country to bluegrass, rock to folk, our stage hosts diverse musical performances.",
            image: "/images/branding/guitar-media.png",
            path: "/calendar",
            color: "#9B5DE5"
        },
        {
            title: "Kentucky Unplugged Series",
            description: "Join us every 1st & 3rd Friday for intimate acoustic sessions featuring Kentucky's finest musicians. A showcase of raw talent and authentic sound.",
            image: "/images/branding/kudzu-guitar-media.png",
            path: "/calendar",
            color: "#F15BB5"
        },
        {
            title: "Line Dancing Events",
            description: "Get your boots moving! Advanced classes Mondays 6-8 PM, Beginner classes Thursdays 6-8 PM. No partner needed, all skill levels welcome.",
            image: "/images/branding/boots-media.png",
            path: "/calendar",
            color: "#00BBF9"
        },
        {
            title: "Private Event Rentals",
            description: "Host your special occasion in our unique venue. Perfect for weddings, corporate events, or private parties. Full service amenities available.",
            image: "/images/branding/private-party-media.png",
            path: "/venue",
            color: "#9B5DE5"
        }
    ];

    return (
        <motion.section 
            className="featured-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="featured-content">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    What We Offer
                </motion.h2>

                <div className="featured-grid">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            className="featured-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={card.path} className="card-content">
                                <div className="card-image-container">
                                    <img 
                                        src={card.image} 
                                        alt={card.title}
                                        className="card-image"
                                    />
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    className="view-all-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link to="/calendar" className="view-all-button">
                        View All Events
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Featured;
