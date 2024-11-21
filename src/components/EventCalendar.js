import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useLocation } from 'react-router-dom';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import setDay from 'date-fns/setDay';
import isBefore from 'date-fns/isBefore';
import addWeeks from 'date-fns/addWeeks';
import isWithinInterval from 'date-fns/isWithinInterval';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/EventCalendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

// Event categories and their colors
const eventCategories = {
  'All': '#ffd700',
  'Kentucky Unplugged': '#FF6B6B',
  'Concerts': '#4ECDC4',
  'Comedy': '#FFD93D',
  'Dinner Theater': '#95E1D3',
  'Parties': '#A8E6CF',
  'Private': '#6c757d',
  'Line Dancing': '#9b59b6'
};

// Event type descriptions
const eventDescriptions = {
  'All': 'Experience the diverse entertainment offerings at The Train Station. From intimate acoustic performances to laughter-filled comedy nights, our historic venue hosts an array of unforgettable events.',
  'Kentucky Unplugged': 'Every 1st and 3rd Friday, Kentucky Unplugged showcases the region\'s finest acoustic talent in an intimate setting. Experience the raw, authentic sound of Kentucky\'s musical heritage.',
  'Concerts': 'Our concert series brings both emerging artists and established acts to our historic stage, featuring diverse genres from rock and blues to country and indie.',
  'Comedy': 'Get ready for nights filled with laughter! Our comedy events feature both national touring comedians and local talent, making The Train Station your go-to destination for stand-up comedy.',
  'Dinner Theater': 'Combining culinary excellence with theatrical entertainment, our dinner theater events offer a unique dining experience. Each show features a specially curated menu that complements the performance.',
  'Parties': 'Celebrate your special occasions at The Train Station! From birthday bashes to corporate events, our venue provides the perfect backdrop for memorable celebrations.',
  'Private': 'Transform our historic venue into your perfect event space. The Train Station offers full-service event planning and customizable spaces for weddings, corporate functions, and private celebrations.',
  'Line Dancing': 'Join us every Monday and Thursday for line dancing classes! Whether you\'re a beginner or advanced dancer, our experienced instructors will have you boot-scootin\' in no time.'
};

// Sample events with new categories
const sampleEvents = [
  {
    title: 'Stand-up Comedy Night',
    category: 'Comedy',
    description: 'A night of laughter with top regional comedians',
    start: new Date(2024, 0, 20, 19, 30),
    end: new Date(2024, 0, 20, 22, 0),
  },
  {
    title: 'Rock Concert: The Rolling Stones Tribute',
    category: 'Concerts',
    description: 'Experience the magic of the Rolling Stones',
    start: new Date(2024, 0, 25, 20, 0),
    end: new Date(2024, 0, 25, 23, 0),
  },
  {
    title: 'Murder Mystery Dinner',
    category: 'Dinner Theater',
    description: 'Interactive dinner theater experience with a thrilling mystery',
    start: new Date(2024, 0, 27, 18, 30),
    end: new Date(2024, 0, 27, 22, 0),
  },
  {
    title: 'Private Corporate Event',
    category: 'Private',
    description: 'Reserved for private corporate function',
    start: new Date(2024, 0, 29, 14, 0),
    end: new Date(2024, 0, 29, 23, 0),
  },
  {
    title: 'Birthday Bash Package',
    category: 'Parties',
    description: 'Private birthday celebration with full venue amenities',
    start: new Date(2024, 0, 30, 19, 0),
    end: new Date(2024, 0, 30, 23, 0),
  },
  {
    title: 'Rock Night',
    category: 'Concerts',
    description: 'Local rock bands showcase',
    start: new Date(2024, 0, 15, 20, 0),
    end: new Date(2024, 0, 15, 23, 0),
  },
  {
    title: 'Comedy Night',
    category: 'Comedy',
    description: 'Stand-up comedy showcase',
    start: new Date(2024, 0, 20, 19, 30),
    end: new Date(2024, 0, 20, 22, 0),
  },
  {
    title: 'Jazz Evening',
    category: 'Concerts',
    description: 'Jazz quartet performance',
    start: new Date(2024, 0, 25, 20, 0),
    end: new Date(2024, 0, 25, 23, 0),
  }
];

const EventCalendar = () => {
  const location = useLocation();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'All');

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state?.category]);

  // Function to get 1st and 3rd Fridays of a month
  const getKentuckyUnpluggedDates = (startDate, endDate) => {
    const events = [];
    let currentDate = startOfMonth(startDate);
    
    while (currentDate <= endDate) {
      // Get first Friday
      let firstFriday = setDay(currentDate, 5); // 5 represents Friday
      if (isBefore(firstFriday, currentDate)) {
        firstFriday = addWeeks(firstFriday, 1);
      }
      
      // Get third Friday (2 weeks after first Friday)
      let thirdFriday = addWeeks(firstFriday, 2);
      
      // Add events if they fall within our date range
      if (isWithinInterval(firstFriday, { start: startDate, end: endDate })) {
        events.push({
          title: 'Kentucky Unplugged',
          category: 'Kentucky Unplugged',
          description: 'An intimate evening showcasing acoustic performances by Kentucky artists',
          start: setHours(firstFriday, 20),
          end: setHours(firstFriday, 23),
        });
      }
      
      if (isWithinInterval(thirdFriday, { start: startDate, end: endDate })) {
        events.push({
          title: 'Kentucky Unplugged',
          category: 'Kentucky Unplugged',
          description: 'An intimate evening showcasing acoustic performances by Kentucky artists',
          start: setHours(thirdFriday, 20),
          end: setHours(thirdFriday, 23),
        });
      }
      
      currentDate = addMonths(currentDate, 1);
    }
    return events;
  };

  // Generate recurring line dancing events for the next 3 months
  const generateEvents = () => {
    const startDate = new Date();
    const endDate = addMonths(startDate, 6);
    let events = [];

    // Add Kentucky Unplugged events
    events = [...events, ...getKentuckyUnpluggedDates(startDate, endDate)];

    // Generate Monday Advanced Classes
    let currentMonday = startDate;
    while (getDay(currentMonday) !== 1) {
      currentMonday = addDays(currentMonday, 1);
    }

    let currentThursday = startDate;
    while (getDay(currentThursday) !== 4) {
      currentThursday = addDays(currentThursday, 1);
    }

    // Generate Monday Advanced Classes
    let mondayDate = currentMonday;
    while (mondayDate <= endDate) {
      events.push({
        title: 'Line Dancing - Advanced Class',
        start: setMinutes(setHours(new Date(mondayDate), 18), 0),
        end: setMinutes(setHours(new Date(mondayDate), 20), 0),
        description: 'Advanced Line Dancing Class - All skill levels welcome! $20 for both weekly classes.',
        category: 'Line Dancing'
      });
      mondayDate = addDays(mondayDate, 7);
    }

    // Generate Thursday Beginner Classes
    let thursdayDate = currentThursday;
    while (thursdayDate <= endDate) {
      events.push({
        title: 'Line Dancing - Beginners Class',
        start: setMinutes(setHours(new Date(thursdayDate), 18), 0),
        end: setMinutes(setHours(new Date(thursdayDate), 20), 0),
        description: 'Beginners Line Dancing Class - All skill levels welcome! $20 for both weekly classes.',
        category: 'Line Dancing'
      });
      thursdayDate = addDays(thursdayDate, 7);
    }

    return events;
  };

  // Combine and filter events based on selected category
  const allEvents = [...generateEvents(), ...sampleEvents]
    .filter(event => selectedCategory === 'All' || event.category === selectedCategory);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: eventCategories[event.category] || eventCategories['All'],
        color: 'white',
        border: 'none',
        borderRadius: '5px'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    // Add newsletter submission logic here
  };

  return (
    <div className="calendar-page">
      <h1>Events at The Train Station</h1>
      
      {/* Category Description */}
      <div className="category-description">
        <p>{eventDescriptions[selectedCategory]}</p>
      </div>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        popup
        views={['month', 'week', 'day']}
        defaultView="month"
        selectable
        onNavigate={(date) => {
          // This enables month navigation
          return date;
        }}
      />

      {/* Event Categories Overview Section */}
      {selectedCategory === 'All' && (
        <section className="event-categories-overview">
          <h2>Our Events</h2>
          <div className="category-grid">
            {Object.entries(eventDescriptions).map(([category, description]) => (
              category !== 'All' && (
                <div key={category} className="category-card">
                  <h3>{category}</h3>
                  <p>{description}</p>
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className="view-events-btn"
                  >
                    View Events
                  </button>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* Related Content Section */}
      <section className="related-content">
        <div className="content-grid">
          {/* Related Blog Posts */}
          <div className="related-blogs">
            <h2>Latest from Our Blog</h2>
            <div className="blog-preview-grid">
              {/* We'll need to integrate with actual blog data */}
              <div className="blog-preview-card">
                <h3>Behind the Scenes: Dinner Theater</h3>
                <p>Get a glimpse into the making of our theatrical productions...</p>
                <a href="/blog/dinner-theater" className="read-more">Read More</a>
              </div>
              <div className="blog-preview-card">
                <h3>Artist Spotlight: Kentucky Unplugged</h3>
                <p>Meet the local artists who make our acoustic nights special...</p>
                <a href="/blog/kentucky-unplugged" className="read-more">Read More</a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="newsletter-signup">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for event updates and exclusive offers!</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Social Media */}
          <div className="social-media">
            <h2>Follow Us</h2>
            <div className="social-links">
              <a href="https://facebook.com/thetrainstation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/thetrainstation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com/thetrainstation" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="event-modal">
          <h2>{selectedEvent.title}</h2>
          <p className="event-time">
            {format(selectedEvent.start, 'MMMM d, yyyy h:mm a')} - 
            {format(selectedEvent.end, 'h:mm a')}
          </p>
          <p className="event-description">{selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
