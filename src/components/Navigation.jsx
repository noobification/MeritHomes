import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GradientButton } from './magicui/gradient-button';
import { AuroraText } from './magicui/aurora-text';
import '../magicui-global.css';
import './Navigation.css';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <nav className={`desktop-nav ${scrolled ? 'nav-visible' : 'nav-hidden'}`}>
            {/* Scroll Progress Bar Wrapper */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
                <motion.div
                    className="progress-bar"
                    style={{ scaleX }}
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
                    <a href="#philosophy" className="nav-link">Philosophy</a>
                    <a href="#process" className="nav-link">Process</a>
                    <a href="#portfolio" className="nav-link">Gallery</a>
                </div>

                <div className="nav-action">
                    <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                        <GradientButton
                            size="sm"
                            variant="ghost"
                            glowEffect={false} // Disable external glow completely for a cleaner look
                            style={{
                                padding: '0.6rem 1.2rem',
                                borderRadius: '30px',
                                background: 'transparent', // Remove background effect
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                overflow: 'hidden'
                            }}
                        >
                            <AuroraText
                                className="text-sm font-medium italic"
                                style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}
                            >
                                Contact Us
                            </AuroraText>
                        </GradientButton>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
