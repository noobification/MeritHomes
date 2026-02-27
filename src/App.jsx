import React, { useEffect, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import DeconstructionHero from './components/DeconstructionHero';
import ConstructionSequence from './components/ConstructionSequence';
const Philosophy = lazy(() => import('./components/Philosophy'));
const Process = lazy(() => import('./components/Process'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <div className="app-container">
        <div className="page-frame"></div>
        <div className="page-frame-border"></div>
        <header>
          <Navigation />
        </header>
        <main>
          <DeconstructionHero videoSrc="/Upscaled.webm" />
          <Suspense fallback={<div className="h-screen bg-background" />}>
            <Philosophy />
          </Suspense>
          <ConstructionSequence />
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
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
