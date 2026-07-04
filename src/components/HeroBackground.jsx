import React, { useState, useEffect } from 'react';

const HeroBackground = ({
    videoWebm = "/Upscaled.webm",
    videoMp4 = "/hero-bg.mp4",
    mobilePoster = "/mobile-hero-poster.webp"
}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            {/* Poster paints immediately on all devices; desktop layers the
                video on top once it loads. */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${mobilePoster})` }}
            />
            {!isMobile && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={mobilePoster}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src={videoWebm} type="video/webm" />
                    <source src={videoMp4} type="video/mp4" />
                </video>
            )}
        </div>
    );
}

export default HeroBackground;
