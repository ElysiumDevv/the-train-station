import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EventList from './components/EventList';
import About from './components/About';
import Contact from './components/Contact';
import EventCalendar from './components/EventCalendar';
import VenueInfo from './components/VenueInfo';
import News from './components/News';
import Blog from './components/Blog';

function HomePage() {
  return (
    <>
      <Hero />
      <section id="events">
        <EventList />
      </section>
      <About />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<EventCalendar />} />
          <Route path="/venue" element={<VenueInfo />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:category" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
