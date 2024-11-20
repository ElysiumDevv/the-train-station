import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.section 
            className="contact-section"
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={formVariants}
        >
            <div className="contact-content">
                <motion.h2 variants={itemVariants}>Get in Touch</motion.h2>
                <motion.p variants={itemVariants}>
                    Have questions about upcoming events or interested in booking our venue? 
                    Drop us a message!
                </motion.p>

                <motion.form 
                    className="contact-form"
                    variants={formVariants}
                >
                    <motion.div className="form-group" variants={itemVariants}>
                        <input type="text" placeholder="Your Name" required />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <input type="email" placeholder="Your Email" required />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <select>
                            <option value="">Select Inquiry Type</option>
                            <option value="general">General Inquiry</option>
                            <option value="booking">Venue Booking</option>
                            <option value="events">Event Information</option>
                        </select>
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>

                <motion.div 
                    className="contact-info"
                    variants={itemVariants}
                >
                    <div className="info-item">
                        <h3>Location</h3>
                        <p>123 Music Avenue</p>
                    </div>
                    <div className="info-item">
                        <h3>Email</h3>
                        <p>info@thetrainstation.com</p>
                    </div>
                    <div className="info-item">
                        <h3>Phone</h3>
                        <p>(555) 123-4567</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Contact;
