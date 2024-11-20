import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header 
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="header"
        >
            <h1>The Train Station</h1>
        </motion.header>
    );
};

export default Header;
