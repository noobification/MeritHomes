import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const lines = gsap.utils.toArray('.reveal-line');

            // Mask reveal animation for each line
            gsap.from(lines, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 25%",
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "power3.out"
            });

            // Subtle parallax for the section background/text to interplay with scroll
            gsap.to('.philosophy-text-container', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: -50,
                ease: "none"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="philosophy-section" id="philosophy" ref={sectionRef}>
            <div className="container-safe relative z-10">
                <div className="philosophy-text-container">
                    <h2 className="sr-only">We don't just build homes. We craft your next chapter.</h2>
                    <div className="line-wrapper" aria-hidden="true">
                        <span className="reveal-line">WE DON'T JUST</span>
                    </div>
                    <div className="line-wrapper" aria-hidden="true">
                        <span className="reveal-line text-accent">BUILD HOMES.</span>
                    </div>
                    <div className="line-wrapper mt-4 md:mt-8" aria-hidden="true">
                        <span className="reveal-line">WE CRAFT</span>
                    </div>
                    <div className="line-wrapper" aria-hidden="true">
                        <span className="reveal-line text-foreground/30">YOUR NEXT</span>
                    </div>
                    <div className="line-wrapper" aria-hidden="true">
                        <span className="reveal-line text-foreground/30">CHAPTER.</span>
                    </div>
                </div>

                <div className="philosophy-description">
                    <p className="philosophy-p">
                        True luxury is found in the details others overlook. We obsess over structural integrity,
                        cutting-edge materials, and absolute precision to create residences that stand as monuments
                        to uncompromised quality.
                    </p>
                </div>
            </div>

            {/* Ethereal Glass Background */}
            <div className="ethereal-background">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="glass-overlay"></div>
            </div>
        </section>
    );
};

export default Philosophy;
