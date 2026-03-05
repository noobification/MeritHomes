import React, { lazy } from 'react';
import DeconstructionHero from '../components/DeconstructionHero';
import ViewportTrigger from '../components/ViewportTrigger';

// Lazy load all below-the-fold components to defer their heavy animation dependencies
const LineArtConstruction = lazy(() => import('../components/LineArtConstruction'));
const Philosophy = lazy(() => import('../components/Philosophy'));
const Process = lazy(() => import('../components/Process'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
    return (
        <main>
            <DeconstructionHero videoSrc="/Upscaled.webm" />
            <ViewportTrigger>
                <Philosophy />
            </ViewportTrigger>
            <ViewportTrigger>
                <LineArtConstruction />
            </ViewportTrigger>
            <ViewportTrigger>
                <Process />
            </ViewportTrigger>
            <ViewportTrigger>
                <Portfolio />
            </ViewportTrigger>
            <DeconstructionHero
                title="A team you can trust"
                subtitle="Built on decades of excellence and integrity."
                videoSrc="/hero-bg.mp4"
                mobilePoster="https://images.unsplash.com/photo-1621673610286-a6b5e788ab82?q=70&w=1200&auto=format&fit=crop&fm=webp"
                showScrollIndicator={false}
            />
            <ViewportTrigger>
                <Contact />
            </ViewportTrigger>
        </main>
    );
}

export default Home;
