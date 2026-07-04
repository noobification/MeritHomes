import React from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../config/site';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3 className="footer-logo">Merit Homes</h3>
                    <p className="footer-tagline">Luxury custom homes, built to last generations.</p>
                    <p className="footer-tagline">Lemont, Illinois — serving Chicagoland's western suburbs and North Shore.</p>
                </div>

                <div className="footer-contact">
                    <p className="footer-label">Direct</p>
                    <p>Dominik: <a href="tel:+16306568229">(630) 656-8229</a></p>
                    <p>Matt: <a href="tel:+16308630868">(630) 863-0868</a></p>
                </div>

                <div className="footer-links">
                    <a href="#portfolio">Vision</a>
                    <a href="#process">Process</a>
                    <a href="#philosophy">Philosophy</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>

            <nav className="footer-service-areas" aria-label="Service areas">
                <p className="footer-label">Where We Build</p>
                <ul className="footer-areas-list">
                    {LOCATIONS.map(({ path, label }) => (
                        <li key={path}>
                            <Link to={path}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="footer-bottom">
                <p>&copy; {currentYear} Merit Homes. All rights reserved.</p>
                <div className="footer-legal">
                    <Link to="/privacy">Privacy Policy</Link>
                    <span className="footer-divider">|</span>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
