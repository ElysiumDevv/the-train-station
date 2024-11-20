import React from 'react';
import { motion } from 'framer-motion';
import '../styles/VenueInfo.css';

const VenueInfo = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Venue Director",
      bio: "With over 15 years in event management, Sarah brings her passion for music and community building to The Train Station.",
      image: "/team/sarah.jpg"
    },
    {
      name: "Mike Rodriguez",
      role: "Technical Director",
      bio: "Mike ensures our sound and lighting systems are always delivering the best possible experience for both artists and audiences.",
      image: "/team/mike.jpg"
    },
    {
      name: "Lisa Chen",
      role: "Events Coordinator",
      bio: "Lisa's creative vision and attention to detail help make every event at The Train Station unique and memorable.",
      image: "/team/lisa.jpg"
    }
  ];

  return (
    <div className="venue-info-container">
      <motion.section 
        className="about-section"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h2>About The Train Station</h2>
        <p>
          Located in the heart of the city, The Train Station is a historic venue that has been 
          transformed into a vibrant cultural hub. Originally built in 1923 as a railway station, 
          our venue maintains its classic architecture while providing modern amenities and 
          state-of-the-art sound and lighting systems.
        </p>
        <p>
          With a capacity of 500 people, we host a diverse range of events from live music 
          performances and dance classes to private events and community gatherings.
        </p>
      </motion.section>

      <motion.section 
        className="mission-section"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h2>Our Mission</h2>
        <p>
          At The Train Station, our mission is to create an inclusive space where music, dance, 
          and community converge. We strive to:
        </p>
        <ul>
          <li>Provide a platform for both established and emerging artists</li>
          <li>Foster a vibrant community through music and dance</li>
          <li>Preserve and celebrate our historic building's heritage</li>
          <li>Create memorable experiences for all who visit</li>
        </ul>
      </motion.section>

      <motion.section 
        className="team-section"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              className="team-member"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="facilities-section"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h2>Facilities</h2>
        <div className="facilities-grid">
          <div className="facility">
            <h3>Main Hall</h3>
            <p>500-person capacity venue with professional sound and lighting</p>
          </div>
          <div className="facility">
            <h3>Dance Floor</h3>
            <p>Spacious hardwood dance floor perfect for classes and events</p>
          </div>
          <div className="facility">
            <h3>Bar & Lounge</h3>
            <p>Full-service bar with comfortable seating areas</p>
          </div>
          <div className="facility">
            <h3>Green Room</h3>
            <p>Private space for performers with modern amenities</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default VenueInfo;
