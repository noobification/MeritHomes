import React, { useState, useEffect } from 'react';
import './DeconstructionHero.css';

const DeconstructionHero = ({
    title = "Merit Homes.",
    subtitle = "where dreams are built from the ground up.",
    videoSrc = "/hero-bg.mp4",
    mobilePoster = "/mobile-hero-poster.webp",
    showScrollIndicator = true,
    // Pages must have exactly one h1; secondary hero instances pass "h2".
    headingLevel: HeadingTag = 'h1'
}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // No loading overlay: the poster image shows instantly and the video
    // fades in over it once ready — perceived speed over ceremony.
    return (
        <div className="hero-sequence-container">
            <div className="video-background-container">
                {/* Poster paints immediately on all devices; on desktop the
                    video fades in over it once it can play. */}
                <div className="hero-poster" style={{
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
                }} />
                {!isMobile && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={mobilePoster}
                        className="hero-video"
                        style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1.2s ease' }}
                        onCanPlay={() => setVideoReady(true)}
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
                <HeadingTag className="hero-title">{title}</HeadingTag>
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
