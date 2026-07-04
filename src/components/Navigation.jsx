import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCATIONS, BUSINESS } from '../config/site';
import './Navigation.css';

const HouseIcon = ({ size = 22 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const NAV_LINKS = [
    { label: 'Where We Build', href: '/chicago', route: true },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Philosophy', href: '#philosophy' },
];

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const progressBarRef = useRef(null);
    const { pathname } = useLocation();

    // Pages that open with a full-height hero keep the nav hidden until the
    // visitor scrolls past it; utility pages (privacy/terms/404) show it
    // immediately.
    const hasHero = pathname === '/' || LOCATIONS.some((l) => l.path === pathname);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Scroll progress for top bar
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (currentScrollY / scrollHeight) : 0;
            if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${progress})`;
            }

            setScrolled(currentScrollY > 50);

            // Auto-hide pattern: reveal on scroll-up, tuck away on scroll-down
            // so the bar never sits on top of pinned section headlines.
            const goingUp = currentScrollY < lastScrollY.current - 2;
            const goingDown = currentScrollY > lastScrollY.current + 2;
            const pastHero = !hasHero || currentScrollY > window.innerHeight - 80;

            if (!pastHero) {
                setIsVisible(false);
            } else if (!hasHero && currentScrollY < 100) {
                setIsVisible(true);
            } else if (goingUp) {
                setIsVisible(true);
            } else if (goingDown) {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasHero]);

    // Close the menu on route change and lock body scroll while open.
    useEffect(() => { setMenuOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
        const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            window.removeEventListener('resize', onResize);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav
                className={`desktop-nav ${isVisible || menuOpen ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'nav-scrolled' : ''}`}
                aria-label="Main navigation"
            >
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
                    <div
                        ref={progressBarRef}
                        className="progress-bar"
                        style={{ transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.1s ease-out' }}
                    />
                </div>

                <div className="nav-container">
                    <Link to="/" className="nav-logo" aria-label="Merit Homes — home">
                        <HouseIcon />
                        <span className="nav-wordmark">Merit Homes</span>
                    </Link>

                    <div className="nav-links">
                        {NAV_LINKS.map(({ label, href, route }) =>
                            route ? (
                                <Link key={href} to={href} className="nav-link">{label}</Link>
                            ) : (
                                <a key={href} href={href} className="nav-link">{label}</a>
                            )
                        )}
                    </div>

                    <div className="nav-action">
                        <a href="tel:+16306568229" className="nav-phone">(630) 656-8229</a>
                        <a href="#contact" className="nav-contact-btn">Contact</a>
                        <button
                            type="button"
                            className={`nav-menu-toggle ${menuOpen ? 'is-open' : ''}`}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((o) => !o)}
                        >
                            <span className="nav-menu-toggle-line" />
                            <span className="nav-menu-toggle-line" />
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
                <div className="mobile-menu-inner">
                    <nav className="mobile-menu-links" aria-label="Mobile navigation">
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        {NAV_LINKS.map(({ label, href, route }) =>
                            route ? (
                                <Link key={href} to={href} onClick={closeMenu}>{label}</Link>
                            ) : (
                                <a key={href} href={href} onClick={closeMenu}>{label}</a>
                            )
                        )}
                    </nav>

                    <p className="mobile-menu-label">Where We Build</p>
                    <ul className="mobile-menu-areas">
                        {LOCATIONS.map(({ path, label }) => (
                            <li key={path}>
                                <Link to={path} onClick={closeMenu}>{label}</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mobile-menu-cta">
                        <a href="tel:+16306568229" className="mobile-menu-call">
                            Call {BUSINESS.name} — (630) 656-8229
                        </a>
                        <a href="#contact" className="mobile-menu-contact" onClick={closeMenu}>
                            Request Consultation
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
