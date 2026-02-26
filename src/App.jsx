import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import DeconstructionHero from './components/DeconstructionHero';
import ConstructionSequence from './components/ConstructionSequence';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
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
      <CustomCursor />
      <div className="app-container">
        <div className="page-frame"></div>
        <header>
          <Navigation />
        </header>
        <main>
          <DeconstructionHero />
          <Philosophy />
          <ConstructionSequence />
          <Process />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
