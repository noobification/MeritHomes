import React, { Suspense, lazy } from 'react';
import DeconstructionHero from '../components/DeconstructionHero';
import LineArtConstruction from '../components/LineArtConstruction';
import Philosophy from '../components/Philosophy';
const Process = lazy(() => import('../components/Process'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
    return (
        <main>
            <DeconstructionHero videoSrc="/Upscaled.webm" />
            <Suspense fallback={<div className="h-screen bg-background" />}>
                <Philosophy />
            </Suspense>
            <LineArtConstruction />
            <Suspense fallback={<div className="h-screen bg-background" />}>
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
