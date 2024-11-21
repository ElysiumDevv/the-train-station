import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Venue.css';
import mainStageImg from '../images/venue/main-stage.png';
import seatingAreaImg from '../images/venue/seating-area.jpg';
import exteriorNightImg from '../images/venue/exterior-night.jpg';
import horizontalLogo from '../images/branding/logo-horizontal.png';

const Venue = () => {
    return (
        <motion.div 
            className="venue-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <section className="venue-hero">
                <div className="hero-content">
                    <motion.img 
                        src={horizontalLogo} 
                        alt="The Train Station" 
                        className="hero-logo"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        The Train Station
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        A Historic Venue in the Heart of Corbin
                    </motion.p>
                </div>
            </section>

            <section className="venue-overview">
                <div className="overview-content">
                    <motion.div 
                        className="overview-text"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Our Story</h2>
                        <p>
                            The Train Station stands as a testament to Corbin's rich musical heritage. 
                            Originally a historic railroad depot, we've transformed this iconic building 
                            into a premier entertainment venue while preserving its authentic charm and character.
                        </p>
                        <p>
                            Today, we're proud to offer a unique space where tradition meets modern entertainment, 
                            hosting everything from intimate acoustic sessions to large-scale concerts and private events.
                        </p>
                    </motion.div>
                    <motion.div 
                        className="overview-stats"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Capacity</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1</span>
                            <span className="stat-label">Professional Stage</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5,000</span>
                            <span className="stat-label">Square Feet</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="venue-spaces">
                <h2>Our Spaces</h2>
                <div className="spaces-grid">
                    <motion.div 
                        className="space-card main-hall"
                        style={{
                            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mainStageImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-content">
                            <h3>Main Hall</h3>
                            <ul>
                                <li>Professional sound system</li>
                                <li>Stage lighting</li>
                                <li>Dance floor</li>
                                <li>Capacity: 500</li>
                            </ul>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="space-card bar-area"
                        style={{
                            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${seatingAreaImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="space-content">
                            <h3>Bar Area</h3>
                            <ul>
                                <li>Full-service bar setup</li>
                                <li>Cocktail tables</li>
                                <li>Ambient lighting</li>
                                <li>Capacity: 75</li>
                            </ul>
                        </div>
                    </motion.div>
                    <motion.div 
                        className="space-card vip-lounge"
                        style={{
                            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${exteriorNightImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="space-content">
                            <h3>VIP Lounge</h3>
                            <ul>
                                <li>Private bar</li>
                                <li>Comfortable seating</li>
                                <li>Premium viewing area</li>
                                <li>Capacity: 50</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="rental-info">
                <h2>Rental Information</h2>
                <div className="rental-grid">
                    <motion.div 
                        className="rental-card weekday"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Standard Rental</h3>
                        <div className="price">$150 First Hour</div>
                        <ul>
                            <li>$50 Each Additional Hour</li>
                            <li>Sunday - Thursday</li>
                            <li>Full Venue Access</li>
                            <li>Basic Sound System</li>
                            <li>Flexible Hours</li>
                        </ul>
                        <div className="best-for">
                            Perfect for: Corporate Events, Rehearsals, Private Parties
                        </div>
                    </motion.div>

                    <motion.div 
                        className="rental-card weekend"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3>Premium Rentals</h3>
                        <div className="price">$750 - $1,250</div>
                        <ul>
                            <li>Friday Night: $750</li>
                            <li>Saturday (Full Day): $1,250</li>
                            <li>Professional Sound & Lighting</li>
                            <li>Full Staff Support</li>
                            <li>Extended Hours</li>
                        </ul>
                        <div className="best-for">
                            Perfect for: Weddings, Concerts, Large Events
                        </div>
                    </motion.div>

                    <motion.div 
                        className="rental-card additional"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Additional Services</h3>
                        <div className="price">Custom Packages</div>
                        <ul>
                            <li>$100 Cleaning Fee (Required)</li>
                            <li>25% Deposit Required</li>
                            <li>Professional DJ Services</li>
                            <li>Full-Service Catering</li>
                            <li>Event Planning Available</li>
                        </ul>
                        <div className="best-for">
                            Contact Us for Package Deals
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="booking-process">
                <h2>Booking Process</h2>
                <div className="process-steps">
                    <motion.div 
                        className="step"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="step-number">1</div>
                        <h3>Initial Inquiry</h3>
                        <p>Contact us with your event details and preferred dates</p>
                    </motion.div>
                    <motion.div 
                        className="step"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="step-number">2</div>
                        <h3>Venue Tour</h3>
                        <p>Schedule a walkthrough to see our spaces in person</p>
                    </motion.div>
                    <motion.div 
                        className="step"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="step-number">3</div>
                        <h3>Booking</h3>
                        <p>Sign contract and pay deposit to secure your date</p>
                    </motion.div>
                    <motion.div 
                        className="step"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="step-number">4</div>
                        <h3>Planning</h3>
                        <p>Work with our team to plan your perfect event</p>
                    </motion.div>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-content">
                    <motion.div 
                        className="contact-text"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Book Your Event</h2>
                        <p>Ready to start planning your event at The Train Station?</p>
                        <div className="contact-info">
                            <p>
                                <span className="contact-label">Call or Text:</span>
                                <a href="tel:+18597880531" className="phone-link">(859) 788-0531</a>
                            </p>
                            <p>
                                <span className="contact-label">Email:</span>
                                <a href="mailto:events@thetrainstation.com">events@thetrainstation.com</a>
                            </p>
                            <p>
                                <span className="contact-label">Location:</span>
                                4672 5th Street Rd, Corbin, KY 40701
                            </p>
                        </div>
                        <div className="social-links">
                            <a href="https://www.facebook.com/thetrainstationcorbin" target="_blank" rel="noopener noreferrer">
                                <img src="/images/social/facebook-icon.svg" alt="" className="social-icon" />
                                Facebook
                            </a>
                            <a href="https://www.instagram.com/thetrainstationcorbin" target="_blank" rel="noopener noreferrer">
                                <img src="/images/social/instagram-icon.svg" alt="" className="social-icon" />
                                Instagram
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Venue;
