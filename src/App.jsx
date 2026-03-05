import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Lemont = lazy(() => import('./pages/Lemont'));
const BurrRidge = lazy(() => import('./pages/BurrRidge'));
const Hinsdale = lazy(() => import('./pages/Hinsdale'));
const OakBrook = lazy(() => import('./pages/OakBrook'));
const Naperville = lazy(() => import('./pages/Naperville'));
const HomerGlen = lazy(() => import('./pages/HomerGlen'));
const PalosPark = lazy(() => import('./pages/PalosPark'));
const WesternSprings = lazy(() => import('./pages/WesternSprings'));
const ClarendonHills = lazy(() => import('./pages/ClarendonHills'));
const BarringtonHills = lazy(() => import('./pages/BarringtonHills'));
const LakeForest = lazy(() => import('./pages/LakeForest'));
const Winnetka = lazy(() => import('./pages/Winnetka'));
const Elmhurst = lazy(() => import('./pages/Elmhurst'));
const GlenEllyn = lazy(() => import('./pages/GlenEllyn'));
const Wheaton = lazy(() => import('./pages/Wheaton'));
const DownersGrove = lazy(() => import('./pages/DownersGrove'));
const Frankfort = lazy(() => import('./pages/Frankfort'));
const StCharles = lazy(() => import('./pages/StCharles'));
const NewLenox = lazy(() => import('./pages/NewLenox'));
const Riverside = lazy(() => import('./pages/Riverside'));
const Chicago = lazy(() => import('./pages/Chicago'));

const Footer = lazy(() => import('./components/Footer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

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

        <Suspense fallback={<div className="h-screen w-full bg-background/50 backdrop-blur-md flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lemont" element={<Lemont />} />
            <Route path="/burr-ridge" element={<BurrRidge />} />
            <Route path="/hinsdale" element={<Hinsdale />} />
            <Route path="/oak-brook" element={<OakBrook />} />
            <Route path="/naperville" element={<Naperville />} />
            <Route path="/homer-glen" element={<HomerGlen />} />
            <Route path="/palos-park" element={<PalosPark />} />
            <Route path="/western-springs" element={<WesternSprings />} />
            <Route path="/clarendon-hills" element={<ClarendonHills />} />
            <Route path="/barrington-hills" element={<BarringtonHills />} />
            <Route path="/lake-forest" element={<LakeForest />} />
            <Route path="/winnetka" element={<Winnetka />} />
            <Route path="/elmhurst" element={<Elmhurst />} />
            <Route path="/glen-ellyn" element={<GlenEllyn />} />
            <Route path="/wheaton" element={<Wheaton />} />
            <Route path="/downers-grove" element={<DownersGrove />} />
            <Route path="/frankfort" element={<Frankfort />} />
            <Route path="/st-charles" element={<StCharles />} />
            <Route path="/new-lenox" element={<NewLenox />} />
            <Route path="/riverside" element={<Riverside />} />
            <Route path="/chicago" element={<Chicago />} />
          </Routes>
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
