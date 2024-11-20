import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/News.css';

const News = () => {
  // This would typically come from an API or CMS
  const [newsArticles] = useState([
    {
      id: 1,
      title: "The Train Station Celebrates 100 Years of History",
      date: "2023-12-15",
      excerpt: "Join us as we commemorate a century of music, dance, and community in our historic venue.",
      image: "/news/centennial.jpg",
      category: "News from The Train Station",
      content: "This December marks an incredible milestone..."
    },
    {
      id: 2,
      title: "New Sound System Installation Complete",
      date: "2023-11-30",
      excerpt: "We're excited to announce the completion of our state-of-the-art sound system upgrade.",
      image: "/news/sound-system.jpg",
      category: "News from The Train Station",
      content: "After months of careful planning..."
    },
    {
      id: 3,
      title: "Introducing Our New Line Dancing Program",
      date: "2023-11-15",
      excerpt: "Weekly line dancing classes for all skill levels, starting this month!",
      image: "/news/line-dancing.jpg",
      category: "News from The Train Station",
      content: "We're thrilled to announce..."
    }
  ]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="news-container">
      <motion.section 
        className="news-header"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1>News from The Train Station</h1>
        <p>Stay up to date with the latest happenings at our venue</p>
      </motion.section>

      <div className="news-grid">
        {newsArticles.map((article, index) => (
          <motion.article 
            key={article.id}
            className="news-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <div className="news-date">{new Date(article.date).toLocaleDateString()}</div>
            </div>
            <div className="news-content">
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <button className="read-more">Read More</button>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div 
        className="newsletter-signup"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h3>Stay Updated</h3>
        <p>Subscribe to our newsletter for the latest news and events</p>
        <form className="signup-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </motion.div>
    </div>
  );
};

export default News;
