import React from 'react';
import ThreeDHoverGallery from './magicui/3d-hover-gallery';
import { AuroraTextEffect } from './magicui/aurora-text-effect';
import './Portfolio.css';

import img0 from '../assets/Luxury-homes-in-Dallas.jpg';
import img1 from '../assets/6402-800x1067.jpg';
import img2 from '../assets/kitchen.jpg';
import img3 from '../assets/rsz_freestanding-bathtub.jpg';

const images = [
    { src: img0, title: "Main Estate", alt: "Luxury stone and brick estate exterior with landscaped driveway at dusk" },
    { src: img1, title: "Exterior", alt: "Modern craftsman home exterior with stone facade and black-framed windows" },
    { src: img2, title: "Kitchen", alt: "Custom white cabinetry kitchen with marble countertops and pendant lighting" },
    { src: img3, title: "Bathroom", alt: "Freestanding soaking tub in a luxury master bathroom with marble tile" }
];

const Portfolio = () => {
    const imageUrls = images.map(img => img.src);
    const imageAlts = images.map(img => img.alt);

    return (
        <section className="portfolio-section" id="portfolio">
            <div className="portfolio-header">
                <h2 className="portfolio-title">
                    Inspired by <AuroraTextEffect text="Perfection" />
                </h2>
            </div>

            {/* Ethereal Glass Background — sits behind content */}
            <div className="ethereal-background">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="glass-overlay"></div>
            </div>

            <div style={{ position: 'relative', zIndex: 20, width: '100%' }}>
                <ThreeDHoverGallery
                    images={imageUrls}
                    imageAlts={imageAlts}
                    autoPlay={false}
                    autoPlayDelay={4000}
                    itemWidth={15}
                    itemHeight={30}
                    hoverScale={25}
                    gap={2}
                    perspective={80}
                    activeWidth={55}
                    backgroundColor="transparent"
                />
            </div>
        </section>
    );
};

export default Portfolio;
