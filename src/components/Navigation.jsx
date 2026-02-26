import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import LuxeButton from "./LuxeButton";
import './Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            // Effect for background glassmorphism
            setScrolled(currentScrollY > 50);

            // Once past hero threshold, stay visible
            if (currentScrollY > heroHeight - 80) {
                setIsVisible(true);
            } else {
                setIsVisible(false); // Hide during hero
            }

            lastScrollY.current = currentScrollY;
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <nav className={`desktop-nav ${isVisible ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'nav-scrolled' : ''}`}>
            {/* Scroll Progress Bar Wrapper */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
                <motion.div
                    className="progress-bar"
                    style={{ scaleX: scrollYProgress }}
                />
            </div>

            <div className="nav-container">
                <div className="nav-logo">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--accent-gold)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 hover:scale-110 cursor-pointer"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>

                <div className="nav-links">
                    <a href="#portfolio" className="nav-link">Vision</a>
                    <a href="#process" className="nav-link">Process</a>
                    <a href="#philosophy" className="nav-link">Philosophy</a>
                </div>

                <div className="nav-action">
                    <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <LuxeButton onClick={() => console.log('Contact clicked')}>
                            CONTACT
                        </LuxeButton>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
