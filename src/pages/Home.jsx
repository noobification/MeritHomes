import React, { Suspense, lazy } from 'react';
import DeconstructionHero from '../components/DeconstructionHero';

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
            <Suspense fallback={<div className="h-screen bg-background" />}>
                <Philosophy />
                <LineArtConstruction />
                <Process />
                <Portfolio />
            </Suspense>
            <DeconstructionHero
                title="A team you can trust"
                subtitle="Built on decades of excellence and integrity."
                videoSrc="/hero-bg.mp4"
                showScrollIndicator={false}
            />
            <Suspense fallback={<div className="h-screen bg-background" />}>
                <Contact />
            </Suspense>
        </main>
    );
}

export default Home;
