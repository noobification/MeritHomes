import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './LineArtConstruction.css';

gsap.registerPlugin(ScrollTrigger);

const LineArtConstruction = () => {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const textRef = useRef(null);
    const indicatorRef = useRef(null);

    useGSAP(() => {
        if (!svgRef.current || !textRef.current) return;

        const paths = svgRef.current.querySelectorAll('path');

        // Setup initial state: all paths hidden via stroke-dash
        paths.forEach(path => {
            if (typeof path.getTotalLength !== 'function') return;
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
            }
        });

        // Phase 1: Foundation (Lower paths)
        const foundation = svgRef.current.querySelectorAll('.foundation');
        tl.to(foundation, {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power1.inOut"
        });

        // Phase 2: Framing (Vertical lines/Structural)
        const framing = svgRef.current.querySelectorAll('.framing');
        tl.to(framing, {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.5,
            ease: "power1.inOut"
        }, "-=0.2");

        // Phase 3: Details (Roof, windows, finish)
        const details = svgRef.current.querySelectorAll('.details');
        tl.to(details, {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5");

        // Text reveal synchronized with animation
        const words = textRef.current.querySelectorAll('.reveal-word');
        tl.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=1");

        // Late fade out for indicator so it guides the initial interaction
        tl.to(indicatorRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
        }, 0.1); // Fade out early in the pinned scroll

        // Hold the completed house for a moment
        tl.to({}, { duration: 0.4 });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="line-art-section h-screen bg-background relative overflow-hidden">
            <div className="flex items-center justify-center h-screen w-full relative">
                {/* Architectural Blueprint SVG */}
                <svg
                    ref={svgRef}
                    viewBox="0 0 800 600"
                    className="w-full max-w-5xl h-auto px-10 md:px-20 opacity-80"
                    fill="none"
                    stroke="var(--accent-gold)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Level 1: Foundation & Base */}
                    <path className="foundation" d="M150 500 L650 500" />
                    <path className="foundation" d="M170 480 H630 V500 H170 Z" />
                    <path className="foundation" d="M200 480 V500" />
                    <path className="foundation" d="M400 480 V500" />
                    <path className="foundation" d="M600 480 V500" />

                    {/* Level 2: Framing & Walls */}
                    <path className="framing" d="M200 480 L200 300 L600 300 L600 480" />
                    <path className="framing" d="M350 480 V300" />
                    <path className="framing" d="M450 480 V300" />
                    <path className="framing" d="M200 400 H350" />
                    <path className="framing" d="M450 400 H600" />

                    {/* Level 3: Roofline */}
                    <path className="details" d="M180 300 L400 150 L620 300 Z" />
                    <path className="details" d="M350 200 V150 H450 V215" />

                    {/* Level 4: Windows & Door */}
                    <path className="details" d="M240 340 H310 V440 H240 Z" />
                    <path className="details" d="M490 340 H560 V440 H490 Z" />
                    <path className="details" d="M375 480 V380 Q400 360 425 380 V480" />

                    {/* Grid/Technical lines for "Blueprint" feel */}
                    <path className="foundation opacity-20" d="M0 520 H800" strokeWidth="0.5" />
                    <path className="details opacity-10" d="M400 0 V600" strokeWidth="0.5" />
                </svg>

                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
                    <h2 ref={textRef} className="text-4xl md:text-7xl lg:text-8xl font-display text-white text-center leading-[0.9] mix-blend-difference">
                        <span className="reveal-word inline-block translate-y-20 opacity-0">Precision&nbsp;</span>
                        <span className="reveal-word inline-block translate-y-20 opacity-0 italic text-accent-gold">in&nbsp;</span>
                        <span className="reveal-word inline-block translate-y-20 opacity-0">every&nbsp;</span>
                        <span className="reveal-word inline-block translate-y-20 opacity-0">line.</span>
                    </h2>
                </div>

                {/* Scroll Indicator - Repositioned to Top */}
                <div ref={indicatorRef} className="scroll-indicator-container absolute top-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent-gold/60 font-mono">Scroll to build</span>
                    <div className="scroll-indicator-line w-[1px] h-12 bg-accent-gold/30 relative overflow-hidden">
                        <div className="scroll-indicator-dot absolute top-0 left-0 w-full h-1/3 bg-accent-gold animate-scroll-dot"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LineArtConstruction;
