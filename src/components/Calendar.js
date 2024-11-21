import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Calendar.css';

const Calendar = () => {
    return (
        <div className="calendar-page">
            {/* Concerts Section */}
            <section id="concerts" className="calendar-section">
                <h2>Live Music Events</h2>
                <div className="events-grid">
                    {/* Event cards will go here */}
                </div>
            </section>

            {/* Unplugged Series Section */}
            <section id="unplugged" className="calendar-section">
                <h2>Kentucky Unplugged Series</h2>
                <div className="events-grid">
                    {/* Unplugged event cards will go here */}
                </div>
            </section>

            {/* Dancing Events Section */}
            <section id="dancing" className="calendar-section">
                <h2>Line Dancing Events</h2>
                <div className="events-grid">
                    {/* Dancing event cards will go here */}
                </div>
            </section>
        </div>
    );
};

export default Calendar;
