import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3 className="footer-logo">Merit Homes</h3>
                    <p className="footer-tagline">Luxury custom homes, built to last generations.</p>
                </div>

                <div className="footer-contact">
                    <p className="footer-label">Direct</p>
                    <p>Dominik: <a href="tel:+16306568229">(630) 656-8229</a></p>
                    <p>Matt: <a href="tel:+16308630868">(630) 863-0868</a></p>
                </div>

                <div className="footer-links">
                    <a href="#philosophy">Philosophy</a>
                    <a href="#process">Process</a>
                    <a href="#portfolio">Gallery</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Merit Homes. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="/privacy">Privacy Policy</a>
                    <span className="footer-divider">|</span>
                    <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
