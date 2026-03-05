import React, { Suspense, lazy, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import LocationLayout from '../components/LocationLayout';
const LineArtConstruction = lazy(() => import('../components/LineArtConstruction'));
import ViewportTrigger from '../components/ViewportTrigger';
import HeroBackground from '../components/HeroBackground';

const Philosophy = lazy(() => import('../components/Philosophy'));
const Process = lazy(() => import('../components/Process'));
const Portfolio = lazy(() => import('../components/Portfolio'));
const Contact = lazy(() => import('../components/Contact'));

function WesternSprings() {
    const faqSchemas = [
        {
            "@type": "Question",
            "name": "Does Merit Homes build in Western Springs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we specialize in modern luxury custom homes and family legacies throughout Western Springs."
            }
        },
        {
            "@type": "Question",
            "name": "What is the focus of Merit Homes in Western Springs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We combine sophisticated design with neighborhood-centric functionality, ensuring every custom home is a testament to craftsmanship."
            }
        }
    ];

    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                y: 150,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <LocationLayout
            title="Modern Luxury Custom Homes in Western Springs, IL"
            description="Building a future in Western Springs? Merit Homes combines sophisticated design with neighborhood-centric functionality, crafting luxury homes."
            locality="Western Springs, IL"
            faqSchemas={faqSchemas}
        >
            <main>
                {/* Hero Section */}
                <section ref={heroRef} className="w-full relative overflow-hidden flex flex-col justify-center min-h-[85vh] pt-40 pb-32 bg-zinc-900">

                    {/* Aesthetic Video Background */}
                    <HeroBackground />

                    <div ref={contentRef} className="container mx-auto px-6 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-end">

                        {/* Left Side: Dramatic Typography */}
                        <motion.div
                            className="lg:col-span-7 text-center lg:text-left"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-accent-gold/60 tracking-[0.2em] text-sm uppercase mb-6 flex items-center justify-center lg:justify-start gap-4">
                                <span className="w-12 h-[1px] bg-accent-gold/40"></span>
                                Western Springs Spotlight
                                <span className="w-12 h-[1px] bg-accent-gold/40 lg:hidden"></span>
                            </h2>
                            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-display text-white mb-2 leading-[1.1]">
                                Bespoke Luxury <br />
                                <span className="text-accent-gold italic font-light">Custom Rebuilds</span> <br />
                                in Western Springs, IL
                            </h1>
                        </motion.div>

                        {/* Right Side: Editorial Paragraph */}
                        <motion.div
                            className="lg:col-span-5 relative pb-4"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="pl-0 lg:pl-8 border-l-0 lg:border-l border-white/10 relative flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="hidden lg:block absolute top-0 -left-[1px] w-[2px] h-12 bg-accent-gold/80"></div>

                                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light mb-8 max-w-xl mx-auto lg:mx-0">
                                    Seeking bespoke architectural detail in Western Springs? Merit Homes designs premium custom rebuilds that perfectly balance modern lifestyle expectations with the established charm of the village. From luxury village lots to private designs, we can realize your vision.
                                </p>

                                <div
                                    className="flex items-center gap-4 text-sm uppercase tracking-widest text-white/50 hover:text-accent-gold transition-colors cursor-pointer w_max group mx-auto lg:mx-0"
                                    onClick={() => window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
                                >
                                    <span className="w-8 h-[1px] bg-white/30 group-hover:bg-accent-gold transition-colors lg:hidden"></span>
                                    <span>Explore the vision</span>
                                    <span className="w-8 h-[1px] bg-white/30 group-hover:bg-accent-gold transition-colors"></span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Background Ethereal Glow */}
                    <div className="absolute top-1/2 right-0 w-[600px] h-[800px] bg-accent-gold/5 rounded-full blur-[150px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>
                </section>

                <ViewportTrigger fallback={<div className="h-screen bg-background" />}>
                    <Philosophy />
                </ViewportTrigger>

                <ViewportTrigger fallback={<div className="h-screen bg-background" />}><LineArtConstruction /></ViewportTrigger>

                <ViewportTrigger fallback={<div className="h-screen bg-background" />}>
                    <Process />
                    <Portfolio />
                </ViewportTrigger>

                <ViewportTrigger fallback={<div className="h-screen bg-background" />}>
                    <Contact />
                </ViewportTrigger>
            </main>
        </LocationLayout>
    );
}

export default WesternSprings;
