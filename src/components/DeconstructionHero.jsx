import React, { useState, useEffect } from 'react';
import './DeconstructionHero.css';

const DeconstructionHero = ({
    title = "Merit Homes.",
    subtitle = "where dreams are built from the ground up.",
    videoSrc = "/hero-bg.mp4",
    mobilePoster = "/mobile-hero-poster.webp",
    showScrollIndicator = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Fallback: If video takes too long OR if we are on mobile (where video doesn't load), reveal the site
        const fallbackTimer = setTimeout(() => {
            if (!isLoaded || isMobile) setIsLoaded(true);
        }, isMobile ? 100 : 800); // Super fast reveal on mobile

        if (isLoaded || isMobile) {
            // Allow the fade-out animation to complete before removing from DOM
            const timer = setTimeout(() => setShowOverlay(false), isMobile ? 300 : 900);
            return () => {
                clearTimeout(timer);
                clearTimeout(fallbackTimer);
            };
        }
        return () => clearTimeout(fallbackTimer);
    }, [isLoaded, isMobile]);

    return (
        <div className="hero-sequence-container">
            {showOverlay && (
                <div className={`loading-overlay ${isLoaded ? 'fade-out' : ''}`}>
                    <div className="loader-content">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--accent-gold)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="loader-icon"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <h2 className="loader-title">Merit Homes</h2>
                        <p className="loader-subtitle">Preparing your experience</p>
                        <div className="loader-line-track">
                            <div className="loader-line-fill"></div>
                        </div>
                    </div>
                </div>
            )}
            <div className="video-background-container">
                {isMobile ? (
                    <div className="mobile-hero-fallback" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${mobilePoster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.6,
                        zIndex: -1
                    }}>
                        {/* Mobile users get the highly optimized WebP poster image instead of a 15MB video */}
                    </div>
                ) : (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="hero-video"
                        onLoadedData={() => setIsLoaded(true)}
                    >
                        {videoSrc.endsWith('.webm') ? (
                            <>
                                <source src={videoSrc} type="video/webm" />
                                <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
                            </>
                        ) : (
                            <>
                                <source src={videoSrc} type="video/mp4" />
                                {videoSrc.includes('.mp4') && (
                                    <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                                )}
                            </>
                        )}
                    </video>
                )}
            </div>

            <div className="hero-content">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-subtitle">{subtitle}</p>
            </div>

            {showScrollIndicator && (
                <div className="scroll-indicator w-full px-4">
                    <p className="text-center w-full">Scroll down to explore</p>
                    <div className="scroll-line"></div>
                </div>
            )}
        </div>
    );
};

export default DeconstructionHero;
