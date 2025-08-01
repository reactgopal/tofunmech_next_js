'use client'; // Essential for client-side functionality in App Router

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const isBrowser = () => typeof window !== 'undefined'; // Check if running in browser

    function scrollToTop() {

        if (!isBrowser()) return; // Prevent execution on server
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For smooth scrolling animation
        });
    }

    const handleScroll = () => {
        // Show button after scrolling down a certain amount
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            // style={{
            //     position: 'fixed',
            //     bottom: '20px',
            //     right: '20px',
            //     display: isVisible ? 'block' : 'none',

            // }}
            aria-label="Scroll to Top"

        >
            {/* Scroll to Top */}
            ↑
        </button>
    );
};

export default ScrollToTopButton;