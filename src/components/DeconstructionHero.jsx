import React, { useState, useEffect } from 'react';
// import { SplineScene } from './SplineScene'; // Removed dead code
import './DeconstructionHero.css';

const DeconstructionHero = ({
    title = "Merit Homes.",
    subtitle = "where dreams are built from the ground up.",
    videoSrc = "/hero-bg.mp4",
    showScrollIndicator = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        // Fallback: If video takes too long, reveal the site anyway
        const fallbackTimer = setTimeout(() => {
            if (!isLoaded) setIsLoaded(true);
        }, 800);

        if (isLoaded) {
            // Allow the fade-out animation to complete before removing from DOM
            const timer = setTimeout(() => setShowOverlay(false), 900);
            return () => {
                clearTimeout(timer);
                clearTimeout(fallbackTimer);
            };
        }
        return () => clearTimeout(fallbackTimer);
    }, [isLoaded]);

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
