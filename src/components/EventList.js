import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/EventList.css';

const mockEvents = [
    {
        id: 1,
        title: "Kentucky Unplugged",
        date: "2024-01-19",
        time: "7:00 PM",
        image: "/images/events/event-placeholder.jpg",
        description: "Join us for an intimate evening of acoustic performances featuring local Appalachian artists.",
        category: "Live Music",
        ticketLink: "#",
        fullDescription: `Experience the raw talent and authentic sound of Kentucky's finest acoustic artists in our intimate venue setting. Kentucky Unplugged showcases the rich musical heritage of Appalachia with performances that will move your soul.

        What to Expect:
        • Multiple local artists performing original music
        • Intimate acoustic setting
        • Full bar and food service available
        • Meet & greet with performers after the show

        Doors open at 6:00 PM
        Show starts at 7:00 PM
        
        Tickets:
        General Admission: $15
        VIP (includes meet & greet): $25`,
        venue: "Main Stage",
        duration: "3 hours",
        ageRestriction: "All ages welcome",
        parking: "Free parking available in main lot"
    },
    {
        id: 2,
        title: "Advanced Line Dancing",
        date: "2024-01-22",
        time: "6:00 PM",
        image: "/images/events/event-placeholder.jpg",
        description: "Perfect your moves with our advanced line dancing class. All experienced dancers welcome!",
        category: "Dance",
        ticketLink: "#",
        fullDescription: `Join our experienced instructor for an energetic advanced line dancing session. This class is perfect for those who know the basics and want to challenge themselves with more complex routines.

        Class Structure:
        • Warm-up with basic steps
        • Learn 2-3 new advanced routines
        • Practice session
        • Cool-down and social dancing

        What to Bring:
        • Comfortable boots or dance shoes
        • Water bottle
        • Positive attitude!

        Duration: 90 minutes
        Skill Level: Advanced
        Price: $12 per person`,
        venue: "Main Floor",
        duration: "90 minutes",
        ageRestriction: "All ages welcome",
        parking: "Free parking available in main lot"
    },
    {
        id: 3,
        title: "Rock & Roll Revival",
        date: "2024-01-25",
        time: "8:00 PM",
        image: "/images/events/event-placeholder.jpg",
        description: "Experience the energy of live rock music with our featured bands bringing classic and modern rock hits!",
        category: "Live Music",
        ticketLink: "#",
        fullDescription: `Get ready for an electrifying night of rock and roll that will shake the foundations of The Train Station! Our Rock & Roll Revival brings together the best rock bands in the region for an unforgettable show.

        Featured Performances:
        • The Kentucky Thunderbolts
        • Electric Mountain
        • The Rail Riders

        Schedule:
        • Doors: 7:00 PM
        • First Band: 8:00 PM
        • Headliner: 10:00 PM

        Tickets:
        • General Admission: $20
        • VIP (includes backstage access): $35`,
        venue: "Main Stage",
        duration: "4 hours",
        ageRestriction: "All ages welcome",
        parking: "Free parking available in main lot"
    },
    {
        id: 4,
        title: "Comedy Night",
        date: "2024-01-28",
        time: "8:00 PM",
        image: "/images/events/event-placeholder.jpg",
        description: "A night of laughter with the region's funniest comedians.",
        category: "Comedy",
        ticketLink: "#",
        fullDescription: `Join us for a hilarious evening featuring the best stand-up comedians from across the region. Our comedy nights are known for bringing both established names and rising stars to The Train Station stage.

        Featured Comedians:
        • Headliner: Sarah Johnson (As seen on Comedy Central)
        • Feature: Mike Thompson (Kentucky Comedy Festival Winner)
        • Host: Local favorite Tom Wilson

        Schedule:
        • Doors: 7:00 PM
        • Show: 8:00 PM
        
        Tickets:
        General Admission: $20
        VIP (includes priority seating & meet and greet): $35

        Note: All ages welcome. Strong parental discretion advised due to adult humor and themes.`,
        venue: "Main Stage",
        duration: "2 hours",
        ageRestriction: "All ages welcome (Strong parental discretion advised)",
        parking: "Free parking available in main lot"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const modalVariants = {
    hidden: { 
        opacity: 0,
        scale: 0.8
    },
    visible: { 
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const EventList = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Events');
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const categories = ['All Events', 'Live Music', 'Dance', 'Comedy'];

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return {
            day: date.toLocaleDateString('en-US', { day: 'numeric' }),
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        };
    };

    const filteredEvents = mockEvents.filter(event => 
        selectedCategory === 'All Events' || event.category === selectedCategory
    );

    return (
        <div className="events-container">
            <motion.div
                className="events-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2>Upcoming Events</h2>
                <div className="events-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="events-grid"
                variants={container}
                initial="hidden"
                animate="show"
                key={selectedCategory}
            >
                {filteredEvents.map((event) => {
                    const formattedDate = formatDate(event.date);
                    return (
                        <motion.div
                            key={event.id}
                            className="event-card"
                            variants={item}
                        >
                            <div className="event-image">
                                <img src={event.image} alt={event.title} />
                                <div className="event-date">
                                    <span className="month">{formattedDate.month}</span>
                                    <span className="day">{formattedDate.day}</span>
                                    <span className="weekday">{formattedDate.weekday}</span>
                                </div>
                                <div className="event-category">{event.category}</div>
                            </div>
                            <div className="event-content">
                                <div className="event-time">{event.time}</div>
                                <h3>{event.title}</h3>
                                <p className="event-description">{event.description}</p>
                                <div className="event-actions">
                                    <a href={event.ticketLink} className="ticket-button">Get Tickets</a>
                                    <button 
                                        className="info-button"
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        More Info
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div
                className="view-all-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Link to="/calendar" className="view-all-button">
                    View Full Calendar
                </Link>
            </motion.div>

            <motion.div
                className="choo-choo-banner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <img 
                    src="/images/branding/choo-choo-banner.png" 
                    alt="Choo Choo" 
                    className="choo-choo-image"
                />
            </motion.div>

            <AnimatePresence>
                {selectedEvent && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div 
                            className="event-modal"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                className="modal-close"
                                onClick={() => setSelectedEvent(null)}
                            >
                                ×
                            </button>
                            
                            <div className="modal-image">
                                <img src={selectedEvent.image} alt={selectedEvent.title} />
                            </div>
                            
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>{selectedEvent.title}</h2>
                                    <div className="event-meta">
                                        <span className="meta-item">
                                            <i className="far fa-calendar"></i>
                                            {selectedEvent.date} at {selectedEvent.time}
                                        </span>
                                        <span className="meta-item">
                                            <i className="far fa-clock"></i>
                                            {selectedEvent.duration}
                                        </span>
                                        <span className="meta-item">
                                            <i className="far fa-map"></i>
                                            {selectedEvent.venue}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="modal-description">
                                    {selectedEvent.fullDescription.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                                
                                <div className="modal-info">
                                    <div className="info-item">
                                        <strong>Age Restriction:</strong> {selectedEvent.ageRestriction}
                                    </div>
                                    <div className="info-item">
                                        <strong>Parking:</strong> {selectedEvent.parking}
                                    </div>
                                </div>
                                
                                <div className="modal-actions">
                                    <a 
                                        href={selectedEvent.ticketLink} 
                                        className="modal-button primary"
                                    >
                                        Get Tickets
                                    </a>
                                    <button 
                                        className="modal-button secondary"
                                        onClick={() => setSelectedEvent(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventList;
