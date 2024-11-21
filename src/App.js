import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import EventList from './components/EventList';
import About from './components/About';
import Contact from './components/Contact';
import EventCalendar from './components/EventCalendar';
import VenueInfo from './components/VenueInfo';
import Venue from './components/Venue';
import News from './components/News';
import Blog from './components/Blog';
import AdminImageManager from './components/AdminImageManager';
import Footer from './components/Footer';
import Featured from './components/Featured';
import ScrollToTop from './utils/scrollToTop';

function HomePage() {
  return (
    <main>
      <Hero />
      <section id="events" className="section">
        <EventList />
      </section>
      <Featured />
      <section id="venue-info" className="section">
        <VenueInfo />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="latest-news" className="section">
        <News limit={3} showViewAll={true} />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </main>
  );
}

function Layout() {
  return (
    <div className="app-container">
      <Navigation />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "calendar",
        element: <EventCalendar />,
      },
      {
        path: "venue",
        element: <Venue />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:category",
        element: <Blog />,
      },
      {
        path: "admin",
        element: <AdminImageManager />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
