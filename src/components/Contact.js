import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState('');

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('sending');

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Failed to send message');
            }

            // Reset form
            setFormData({
                name: '',
                email: '',
                inquiryType: '',
                message: ''
            });
            setSubmitStatus('sent');
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus('error');
            // Clear error message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        }
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
                <motion.h2 variants={itemVariants}>Contact Us</motion.h2>
                <motion.p variants={itemVariants}>
                    Have questions about our events or interested in booking The Train Station? 
                    We'd love to hear from you!
                </motion.p>

                <motion.form 
                    className="contact-form"
                    variants={formVariants}
                    onSubmit={handleSubmit}
                >
                    <motion.div className="form-group" variants={itemVariants}>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name" 
                            required 
                        />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email" 
                            required 
                        />
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <select 
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Inquiry Type</option>
                            <option value="General">General Inquiry</option>
                            <option value="Venue Rental">Venue Rental</option>
                            <option value="Event">Event Information</option>
                            <option value="Line Dancing">Line Dancing Classes</option>
                            <option value="Kentucky Unplugged">Kentucky Unplugged Series</option>
                        </select>
                    </motion.div>

                    <motion.div className="form-group" variants={itemVariants}>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message" 
                            rows="5" 
                            required
                        ></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={submitStatus === 'sending'}
                    >
                        {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    {submitStatus === 'sent' && (
                        <motion.p 
                            className="success-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Thank you for your message! We'll get back to you soon.
                        </motion.p>
                    )}
                    {submitStatus === 'error' && (
                        <motion.p 
                            className="error-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Sorry, there was an error sending your message. Please try again.
                        </motion.p>
                    )}
                </motion.form>

                <motion.div 
                    className="contact-info"
                    variants={itemVariants}
                >
                    <div className="info-item">
                        <h3>Address</h3>
                        <p>The Train Station</p>
                        <p>4672 5th Street Rd</p>
                        <p>Corbin, KY 40701</p>
                    </div>
                    <div className="info-item">
                        <h3>Contact</h3>
                        <p>
                            <a href="tel:+18597880531">(859) 788-0531</a>
                        </p>
                        <p>
                            <a href="mailto:events@thetrainstation.com">events@thetrainstation.com</a>
                        </p>
                    </div>
                    <div className="info-item">
                        <h3>Hours</h3>
                        <p>Monday - Friday: 9 AM - 5 PM</p>
                        <p>Event Hours: As Scheduled</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Contact;
