import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ConstructionSequence = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const revealRef = useRef(null);
    const scrollHintRef = useRef(null);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const frameCount = 142;
        const startFrame = 9;

        const currentFrame = (index) =>
            `/sequence/frame_${(index + startFrame).toString().padStart(4, '0')}.jpg`;

        const images = [];
        const constructionSequence = { frame: frameCount - 1 };

        // Tiered Loading Strategy
        const loadFrame = (i) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    images[i] = img;
                    if (i === frameCount - 1) render();
                    resolve();
                };
                img.src = currentFrame(i);
            });
        };

        // Tier 1: Initial frames (Immediate)
        const loadInitialTier = async () => {
            const initialPromises = [];
            for (let i = 0; i < 10; i++) {
                initialPromises.push(loadFrame(i));
            }
            await Promise.all(initialPromises);
            render();

            // Tier 2 & 3: Remaining frames (Deferred)
            // Use requestIdleCallback or setTimeout to avoid blocking main thread
            setTimeout(() => {
                for (let i = 10; i < frameCount; i++) {
                    loadFrame(i);
                }
            }, 500);
        };

        loadInitialTier();

        function render() {
            if (!canvas) return;

            const frameIndex = Math.round(constructionSequence.frame);
            const img = images[frameIndex];

            if (img && img.complete) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const cropRatioY = 0.12;
                const cropPixelsY = img.height * cropRatioY;

                const srcWidth = img.width;
                const srcHeight = img.height - (cropPixelsY * 2);
                const srcY = cropPixelsY;

                context.clearRect(0, 0, canvas.width, canvas.height);

                // 1. Draw Blurred Background (Filling the entire canvas)
                context.save();
                // Zoom background image to fill the canvas and add blur
                const bgScale = Math.max(canvas.width / srcWidth, canvas.height / srcHeight) * 1.5;
                const bgWidth = srcWidth * bgScale;
                const bgHeight = srcHeight * bgScale;
                const bgX = (canvas.width - bgWidth) / 2;
                const bgY = (canvas.height - bgHeight) / 2;

                context.filter = 'blur(40px) brightness(1.1)';
                context.drawImage(
                    img,
                    0, srcY, srcWidth, srcHeight,
                    bgX, bgY, bgWidth, bgHeight
                );
                context.restore();

                // 2. Draw Sharp Foreground (Full-bleed / Overflowing)
                const zoomFactor = 1.1;
                const hRatio = canvas.width / srcWidth;
                const vRatio = canvas.height / srcHeight;
                const ratio = Math.max(hRatio, vRatio) * zoomFactor;

                const newWidth = srcWidth * ratio;
                const newHeight = srcHeight * ratio;

                const centerShift_x = (canvas.width - newWidth) / 2;
                const centerShift_y = (canvas.height - newHeight) / 2;

                const mobileShiftY = window.innerWidth < 768 ? -canvas.height * 0.05 : 0;

                // Add a subtle drop shadow to the foreground layer
                context.save();
                context.shadowColor = 'rgba(0, 0, 0, 0.8)';
                context.shadowBlur = 100;

                context.drawImage(
                    img,
                    0, srcY, srcWidth, srcHeight,
                    centerShift_x, centerShift_y + mobileShiftY, newWidth, newHeight
                );
                context.restore();
            }
        }

        window.addEventListener('resize', render);
        render();

        // Frame scrub animation
        gsap.to(constructionSequence, {
            frame: 0,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            },
            onUpdate: render,
        });

        // "Imagine it" heading — each word fades in one at a time
        const words = containerRef.current.querySelectorAll('.reveal-word');
        gsap.fromTo(words,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "55% bottom",
                    end: "78% bottom",
                    scrub: true,
                },
            }
        );

        // "We'll take care" subtitle — reveals at the very end
        const subtitleEl = containerRef.current.querySelector('.reveal-subtitle');
        gsap.fromTo(subtitleEl,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "88% bottom",
                    end: "98% bottom",
                    scrub: true,
                },
            }
        );

        // Scroll Hint Animation
        gsap.to(".scroll-wheel", {
            y: 48,
            duration: 1.5,
            repeat: -1,
            ease: "power1.inOut"
        });

        // Scroll Hint Fade Out
        gsap.to(scrollHintRef.current, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "15% top",
                scrub: true,
            }
        });

        return () => window.removeEventListener('resize', render);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-background" style={{ height: "400vh" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black"></canvas>

                {/* Reveal text — staggered during and after scroll */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <h2
                        className="text-4xl md:text-7xl lg:text-9xl font-display text-white text-center tracking-tight leading-[0.9] px-4"
                        style={{ textShadow: "0px 4px 50px rgba(0,0,0,0.8)" }}
                    >
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>All&nbsp;</span>
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>you&nbsp;</span>
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>have&nbsp;</span>
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>to&nbsp;</span>
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>do</span>
                        <br />
                        <span className="reveal-word inline-block" style={{ opacity: 0 }}>is&nbsp;</span>
                        <span className="reveal-word inline-block italic" style={{ opacity: 0, color: 'var(--accent-gold)' }}>imagine&nbsp;</span>
                        <span className="reveal-word inline-block italic" style={{ opacity: 0, color: 'var(--accent-gold)' }}>it.</span>
                    </h2>
                    <p
                        className="reveal-subtitle mt-8 text-white/70 text-lg md:text-xl uppercase tracking-wide md:tracking-[0.3em] font-body font-light text-center px-10"
                        style={{ opacity: 0, textShadow: "0px 2px 20px rgba(0,0,0,0.5)" }}
                    >
                        We'll take care of the rest.
                    </p>
                </div>

                {/* Scroll Hint Indicator */}
                <div
                    ref={scrollHintRef}
                    className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-body">Keep Scrolling</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-accent-gold/50 to-white/0 relative overflow-hidden">
                        <div className="scroll-wheel absolute top-0 left-0 w-full h-1/3 bg-accent-gold"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConstructionSequence;
