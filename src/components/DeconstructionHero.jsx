import React, { useState, useEffect } from 'react';
import { SplineScene } from './SplineScene';
import './DeconstructionHero.css';

const DeconstructionHero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            // Allow the fade-out animation to complete before removing from DOM
            const timer = setTimeout(() => setShowOverlay(false), 900);
            return () => clearTimeout(timer);
        }
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
            <div className="spline-overlay-container">
                <SplineScene
                    scene="https://prod.spline.design/oE8ZJS1l2fvVORXl/scene.splinecode"
                    className="spline-overlay"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>

            <div className="hero-content">
                <h1 className="hero-title">Merit Homes.</h1>
                <p className="hero-subtitle">
                    where dreams are built from the ground up.
                </p>
            </div>

            <div className="scroll-indicator">
                <p>Scroll down to explore</p>
                <div className="scroll-line"></div>
            </div>
        </div>
    );
};

export default DeconstructionHero;
