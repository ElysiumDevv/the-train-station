import React from 'react';
import { motion } from 'framer-motion';
import '../styles/EventList.css';

const mockEvents = [
    {
        id: 1,
        title: "Summer Jazz Night",
        date: "2024-06-15",
        time: "8:00 PM",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
        description: "An evening of smooth jazz and contemporary fusion",
        ticketLink: "#"
    },
    {
        id: 2,
        title: "Rock Revolution",
        date: "2024-06-20",
        time: "9:00 PM",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
        description: "Local rock bands showcase their latest tracks",
        ticketLink: "#"
    },
    {
        id: 3,
        title: "Electronic Dreams",
        date: "2024-06-25",
        time: "10:00 PM",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        description: "A night of electronic music and visual art",
        ticketLink: "#"
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

const EventList = () => {
    return (
        <motion.div 
            className="event-list"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {mockEvents.map((event) => (
                <motion.div 
                    key={event.id} 
                    className="event-item"
                    variants={item}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    <div className="event-image">
                        <img src={event.image} alt={event.title} />
                    </div>
                    <div className="event-content">
                        <h2>{event.title}</h2>
                        <p className="event-date">{event.date} at {event.time}</p>
                        <p className="event-description">{event.description}</p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="ticket-button"
                        >
                            Get Tickets
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default EventList;
