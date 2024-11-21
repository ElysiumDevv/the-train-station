import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBlogSubmenuOpen, setIsBlogSubmenuOpen] = useState(false);
    const [isEventsSubmenuOpen, setIsEventsSubmenuOpen] = useState(false);

    const menuVariants = {
        closed: {
            x: "-100%",
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            x: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const linkVariants = {
        closed: { x: -50, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    const submenuVariants = {
        closed: { 
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
        open: { 
            height: "auto",
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };

    const closeNavigation = () => {
        setIsOpen(false);
        setIsBlogSubmenuOpen(false);
        setIsEventsSubmenuOpen(false);
    };

    return (
        <nav className="main-nav">
            <div className="nav-content">
                <motion.button
                    className="nav-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            className="navigation"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                        >
                            <motion.div className={`nav-links ${isEventsSubmenuOpen ? 'submenu-open' : ''} ${isBlogSubmenuOpen ? 'submenu-open' : ''}`}>
                                <motion.div variants={linkVariants} className={`nav-item ${isEventsSubmenuOpen || isBlogSubmenuOpen ? 'hidden' : ''}`}>
                                    <Link to="/" onClick={closeNavigation}>Home</Link>
                                </motion.div>
                                
                                <motion.div variants={linkVariants} className="submenu-container">
                                    <div 
                                        className="submenu-trigger"
                                        onClick={() => setIsEventsSubmenuOpen(!isEventsSubmenuOpen)}
                                    >
                                        Events
                                        <motion.span 
                                            className={`arrow ${isEventsSubmenuOpen ? 'open' : ''}`}
                                            initial={false}
                                            animate={{ rotate: isEventsSubmenuOpen ? 180 : 0 }}
                                        >
                                            ▼
                                        </motion.span>
                                    </div>
                                    <AnimatePresence>
                                        {isEventsSubmenuOpen && (
                                            <motion.div
                                                className="submenu"
                                                variants={submenuVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'All' }}
                                                >
                                                    Calendar
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Kentucky Unplugged' }}
                                                >
                                                    Kentucky Unplugged
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Concerts' }}
                                                >
                                                    Concerts
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Comedy' }}
                                                >
                                                    Comedy
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Dinner Theater' }}
                                                >
                                                    Dinner Theater
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Parties' }}
                                                >
                                                    Parties
                                                </Link>
                                                <Link 
                                                    to="/calendar"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Private' }}
                                                >
                                                    Private Events
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.div variants={linkVariants} className={`nav-item ${isEventsSubmenuOpen || isBlogSubmenuOpen ? 'hidden' : ''}`}>
                                    <Link to="/venue" onClick={closeNavigation}>Venue Info</Link>
                                </motion.div>

                                <motion.div variants={linkVariants} className="submenu-container">
                                    <div 
                                        className="submenu-trigger"
                                        onClick={() => setIsBlogSubmenuOpen(!isBlogSubmenuOpen)}
                                    >
                                        Blog
                                        <motion.span 
                                            className={`arrow ${isBlogSubmenuOpen ? 'open' : ''}`}
                                            initial={false}
                                            animate={{ rotate: isBlogSubmenuOpen ? 180 : 0 }}
                                        >
                                            ▼
                                        </motion.span>
                                    </div>
                                    <AnimatePresence>
                                        {isBlogSubmenuOpen && (
                                            <motion.div
                                                className="submenu"
                                                variants={submenuVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                <Link 
                                                    to="/blog"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'All' }}
                                                >
                                                    All Posts
                                                </Link>
                                                <Link 
                                                    to="/blog"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'The Dark Room Project' }}
                                                >
                                                    The Dark Room Project
                                                </Link>
                                                <Link 
                                                    to="/blog"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Artist Spotlight' }}
                                                >
                                                    Artist Spotlight
                                                </Link>
                                                <Link 
                                                    to="/blog"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'Events' }}
                                                >
                                                    Events
                                                </Link>
                                                <Link 
                                                    to="/blog"
                                                    onClick={closeNavigation}
                                                    state={{ category: 'The Station Life' }}
                                                >
                                                    The Station Life
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.div variants={linkVariants} className={`nav-item ${isEventsSubmenuOpen || isBlogSubmenuOpen ? 'hidden' : ''}`}>
                                    <a href="/#contact" onClick={closeNavigation}>Contact</a>
                                </motion.div>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navigation;
