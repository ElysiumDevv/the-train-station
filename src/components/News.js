import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/News.css';

const News = () => {
    const newsItems = [
        {
            title: "Upcoming Events",
            description: "Check out our latest lineup of live performances, featuring both local talents and touring artists.",
            icon: "📅",
            link: "/calendar",
            color: "#FF6B6B"
        },
        {
            title: "Dance Class Schedule",
            description: "New dance classes added! Join us for beginner and advanced line dancing sessions.",
            icon: "👢",
            link: "/calendar",
            color: "#4ECDC4"
        },
        {
            title: "Venue Updates",
            description: "We're constantly improving our venue to enhance your experience. See what's new!",
            icon: "🏛️",
            link: "/venue",
            color: "#FFD93D"
        }
    ];

    return (
        <motion.section 
            className="news-section"
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
                Latest Updates
            </motion.h2>
            
            <div className="news-grid">
                {newsItems.map((item, index) => (
                    <Link 
                        key={index}
                        to={item.link}
                        className="news-link"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        <motion.div
                            className="news-card"
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
                                borderColor: item.color
                            }}
                        >
                            <div className="news-content">
                                <div className="news-icon" style={{ backgroundColor: item.color }}>
                                    {item.icon}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <div className="news-footer">
                                    <span className="read-more">Read More →</span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.section>
    );
};

export default News;
