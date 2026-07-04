import React, { lazy } from 'react';
import DeconstructionHero from '../components/DeconstructionHero';
import ViewportTrigger from '../components/ViewportTrigger';
import Seo from '../components/Seo';

// Lazy load all below-the-fold components to defer their heavy animation dependencies
const LineArtConstruction = lazy(() => import('../components/LineArtConstruction'));
const Philosophy = lazy(() => import('../components/Philosophy'));
const Process = lazy(() => import('../components/Process'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Contact = lazy(() => import('../components/Contact'));

function Home() {
    return (
        <main>
            <Seo
                title="Luxury Custom Home Builder in Chicagoland | Merit Homes"
                description="Merit Homes builds luxury custom homes and teardown rebuilds across Chicagoland's western suburbs — Hinsdale, Naperville, Oak Brook and beyond. Based in Lemont, IL. Free consultation."
                path="/"
            />
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
                mobilePoster="/mobile-hero-poster.webp"
                showScrollIndicator={false}
                headingLevel="h2"
            />
            <ViewportTrigger>
                <Contact />
            </ViewportTrigger>
        </main>
    );
}

export default Home;
