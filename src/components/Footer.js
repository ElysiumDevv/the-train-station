import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus('sending');

    try {
      const response = await fetch('http://localhost:3001/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setEmail('');
      setSubscribeStatus('success');
      setTimeout(() => setSubscribeStatus(''), 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(''), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>The Train Station</h3>
          <p>Where Appalachian Music Comes Alive</p>
          <div className="address-info">
            <p>4672 5th Street Rd</p>
            <p>Corbin, KY 40701</p>
            <a href="tel:+18597880531" className="phone-link">(859) 788-0531</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/calendar">Event Calendar</Link>
          <Link to="/venue">Venue Info</Link>
          <Link to="/rentals">Private Events</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest events and news!</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit" disabled={subscribeStatus === 'sending'}>
              Subscribe
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <p className="subscribe-message success">Thanks for subscribing!</p>
          )}
          {subscribeStatus === 'error' && (
            <p className="subscribe-message error">Subscription failed. Please try again.</p>
          )}
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/thetrainstationcorbin" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/images/social/facebook-icon.svg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/thetrainstationcorbin" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/images/social/instagram-icon.svg" alt="Instagram" />
            </a>
            <a href="https://twitter.com/TrainStationKY" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src="/images/social/twitter-icon.svg" alt="Twitter" />
            </a>
            <a href="https://www.youtube.com/@thetrainstationcorbin" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <img src="/images/social/youtube-icon.svg" alt="YouTube" />
            </a>
            <a href="https://www.tiktok.com/@thetrainstationcorbin" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <img src="/images/social/tiktok-icon.svg" alt="TikTok" />
            </a>
            <a href="https://www.snapchat.com/add/trainstationky" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <img src="/images/social/snapchat-icon.svg" alt="Snapchat" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Train Station, Corbin KY. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/admin" className="admin-link">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
