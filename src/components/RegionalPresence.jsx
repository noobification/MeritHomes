import React from 'react';
import { motion } from 'framer-motion';

const locations = [
    { name: "Chicagoland", path: "/chicago", tag: "Authority" },
    { name: "Lemont", path: "/lemont", tag: "Benchmark" },
    { name: "Burr Ridge", path: "/burr-ridge", tag: "Elite" },
    { name: "Hinsdale", path: "/hinsdale", tag: "Historic" },
    { name: "Oak Brook", path: "/oak-brook", tag: "Exclusive" },
    { name: "Naperville", path: "/naperville", tag: "Dynamic" },
    { name: "Homer Glen", path: "/homer-glen", tag: "Expansive" },
    { name: "Palos Park", path: "/palos-park", tag: "Wooded" },
    { name: "Western Springs", path: "/western-springs", tag: "Bespoke" },
    { name: "Clarendon Hills", path: "/clarendon-hills", tag: "Boutique" },
    { name: "Barrington Hills", path: "/barrington-hills", tag: "Acreage" },
    { name: "Lake Forest", path: "/lake-forest", tag: "Legacy" },
    { name: "Winnetka", path: "/winnetka", tag: "Prestigious" },
    { name: "Elmhurst", path: "/elmhurst", tag: "Velocity" },
    { name: "Glen Ellyn", path: "/glen-ellyn", tag: "Charm" },
    { name: "Wheaton", path: "/wheaton", tag: "Established" },
    { name: "Downers Grove", path: "/downers-grove", tag: "Infill" },
    { name: "Frankfort", path: "/frankfort", tag: "Growth" },
    { name: "St. Charles", path: "/st-charles", tag: "Riverfront" },
    { name: "New Lenox", path: "/new-lenox", tag: "Modern" },
    { name: "Riverside", path: "/riverside", tag: "Landmark" }
];

const RegionalPresence = () => {
    return (
        <section className="py-24 bg-background relative border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side: Editorial Context */}
                    <div className="lg:col-span-4">
                        <h2 className="text-accent-gold/60 tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-accent-gold/40"></span>
                            Regional Footprint
                        </h2>
                        <h3 className="text-3xl font-display text-white leading-tight mb-6">
                            Where We <br />
                            <span className="text-accent-gold italic font-light">Craft Legacies.</span>
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            Our presence across Chicagoland is defined by a commitment to architectural integrity and absolute luxury in every zip code we touch.
                        </p>
                    </div>

                    {/* Right Side: The Index */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                            {locations.map((loc, idx) => (
                                <motion.a
                                    key={loc.name}
                                    href={loc.path}
                                    className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-accent-gold/40 transition-colors"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <span className="text-xl font-display text-white/70 group-hover:text-white transition-colors">
                                        {loc.name}
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 group-hover:text-accent-gold/60 transition-colors">
                                            {loc.tag || loc.description}
                                        </span>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-white/10 group-hover:text-accent-gold group-hover:translate-x-1 transition-all"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegionalPresence;
