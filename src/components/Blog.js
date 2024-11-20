import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Blog.css';

// Blog categories with descriptions
const blogCategories = {
  'All Posts': 'Explore all the latest stories, news, and updates from The Train Station.',
  'The Dark Room Project': 'Step into our intimate performance space where emerging artists showcase their raw talent in an up-close setting.',
  'Artist Spotlight': 'Get to know the artists who grace our stage through in-depth interviews and behind-the-scenes features.',
  'Events': 'Recaps of our most memorable shows and previews of upcoming performances.',
  'The Station Life': 'Stories about our historic venue, our team, and the vibrant community we\'ve built.'
};

// Sample blog posts (in a real app, this would come from an API/database)
const blogPosts = [
  {
    id: 1,
    title: 'The Dark Room Sessions: A New Chapter',
    category: 'The Dark Room Project',
    author: 'Sarah Mitchell',
    date: '2024-01-15',
    image: '/images/blog/dark-room-sessions.jpg',
    excerpt: 'Introducing our new intimate performance series featuring emerging local artists...',
    content: 'Full article content here...',
    tags: ['music', 'local artists', 'performance']
  },
  {
    id: 2,
    title: 'Behind the Scenes: Kentucky Unplugged',
    category: 'Artist Spotlight',
    author: 'Mike Thompson',
    date: '2024-01-12',
    image: '/images/blog/kentucky-unplugged.jpg',
    excerpt: 'Meet the talented musicians who make our acoustic nights unforgettable...',
    content: 'Full article content here...',
    tags: ['kentucky unplugged', 'acoustic', 'local music']
  },
  {
    id: 3,
    title: 'A Night of Comedy: January Highlights',
    category: 'Events',
    author: 'Lisa Parker',
    date: '2024-01-10',
    image: '/images/blog/comedy-night.jpg',
    excerpt: 'Relive the laughter from our latest comedy showcase...',
    content: 'Full article content here...',
    tags: ['comedy', 'events', 'entertainment']
  },
  {
    id: 4,
    title: 'Restoring The Train Station: A Labor of Love',
    category: 'The Station Life',
    author: 'James Wilson',
    date: '2024-01-08',
    image: '/images/blog/restoration.jpg',
    excerpt: 'Discover the story behind our historic venue\'s restoration...',
    content: 'Full article content here...',
    tags: ['history', 'renovation', 'community']
  }
];

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    // Update category based on URL parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && blogCategories.hasOwnProperty(category)) {
      setSelectedCategory(category);
    }
  }, [location]);

  useEffect(() => {
    // Filter posts based on category and search term
    let filtered = blogPosts;
    
    if (selectedCategory !== 'All Posts') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate({
      pathname: location.pathname,
      search: category === 'All Posts' ? '' : `?category=${encodeURIComponent(category)}`
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-container">
      {/* Hero Section */}
      <section className="blog-hero">
        <h1>The Train Station Blog</h1>
        <p>Stories, news, and updates from Kentucky's premier music venue</p>
      </section>

      {/* Category Description */}
      <section className="category-description">
        <h2>{selectedCategory}</h2>
        <p>{blogCategories[selectedCategory]}</p>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          {Object.keys(blogCategories).map((category) => (
            <button
              key={category}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="blog-card-image">
                <img src={post.image} alt={post.title} />
                <div className="category-tag">{post.category}</div>
              </div>
              <div className="blog-card-content">
                <h3>{post.title}</h3>
                <div className="blog-meta">
                  <span className="author">{post.author}</span>
                  <span className="date">{formatDate(post.date)}</span>
                </div>
                <p>{post.excerpt}</p>
                <div className="tags">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
                <button className="read-more">Read More</button>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="no-results">
            <h3>No posts found</h3>
            <p>Try adjusting your search or category filters</p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="newsletter-content">
          <h2>Stay in the Loop</h2>
          <p>Subscribe to our newsletter for the latest stories and updates</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;
