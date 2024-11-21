import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
    const features = [
        {
            title: "Spacious Dance Floor",
            description: "A massive 1,200 sq. ft dance floor ensures you're never fighting for space to move and groove.",
            icon: "💃",
            color: "#9B5DE5"
        },
        {
            title: "Live Entertainment",
            description: "From live music to comedy nights and dinner theater events, we offer diverse entertainment options.",
            icon: "🎭",
            color: "#F15BB5"
        },
        {
            title: "Full-Service Bar",
            description: "Enjoy our selection of Beer, Malt Liquor, Wine Coolers, and premium Non-Alcoholic options like Liquid Death Water.",
            icon: "🍺",
            color: "#00BBF9"
        },
        {
            title: "Historic Venue",
            description: "Located in Corbin, Kentucky, in what was once the beloved Felts Music store, we're keeping the musical legacy alive.",
            icon: "🏛️",
            color: "#9B5DE5"
        }
    ];

    return (
        <motion.section 
            className="about-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="about-content">
                <motion.div 
                    className="about-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>About The Train Station</h2>
                    <p className="lead-text">
                        Welcome to The Train Station - Corbin's premier entertainment venue, 
                        where live music, comedy, and theater come together under one roof.
                    </p>
                    <p>
                        The Train Station stands in what was once the home of Felts Music, a beloved local 
                        institution. Today, we honor that musical heritage while expanding into a 
                        multi-purpose entertainment venue. Our massive 1,200 square foot dance floor 
                        gives you plenty of room to move, ensuring you're never cramped for space.
                    </p>
                    <p>
                        While we're proud of our reputation as a premier music venue, we're more than just 
                        live bands. Join us for our hilarious comedy nights featuring regional comedians, 
                        or experience our immersive dinner theater events that combine great food with 
                        theatrical entertainment.
                    </p>
                    <p>
                        Complete your experience at our full-service bar, offering a variety of beverages 
                        from Beer and Wine Coolers to premium Non-Alcoholic options like Liquid Death Water. 
                        Whether you're here for the music, the laughs, or the drama, The Train Station 
                        promises an unforgettable night out.
                    </p>
                </motion.div>

                <motion.div 
                    className="features-grid"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                        >
                            <span className="feature-icon" style={{ color: feature.color }}>
                                {feature.icon}
                            </span>
                            <h3 style={{ color: feature.color }}>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;
