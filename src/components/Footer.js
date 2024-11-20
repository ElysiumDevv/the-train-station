import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>The Train Station</h3>
          <p>Live Music Venue</p>
          <p>123 Music Street</p>
          <p>Nashville, TN 37203</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/events">Events</Link>
          <Link to="/venue">Venue Info</Link>
          <Link to="/contact">Contact</Link>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest events</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Train Station. All rights reserved.</p>
        <Link to="/admin" className="admin-link">Admin</Link>
      </div>
    </footer>
  );
};

export default Footer;
