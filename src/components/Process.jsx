import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        id: '01',
        title: 'Architectural Vision',
        subtitle: 'SITING & DESIGN',
        description: 'Every masterpiece begins with an understanding of its canvas. We collaborate closely with renowned architects to ensure your home harmonizes with its environment, maximizing natural light and capturing the unique essence of your lot.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop' // Architectural blueprint/modern home concept
    },
    {
        id: '02',
        title: 'Structural Integrity',
        subtitle: 'BEYOND-CODE FRAMING',
        description: 'True luxury requires an unshakable foundation. Our framing process utilizes premium lumber and rigorous engineered steel integrations, ensuring your home is built not just to pass inspection, but to endure for generations.',
        image: 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Framing image
    },
    {
        id: '03',
        title: 'The Envelope',
        subtitle: 'CLIMATE & ACOUSTICS',
        description: 'A sanctuary must be silent and temperate. We utilize premium sheathing and closed-cell spray foam insulation, creating an invisible, impenetrable thermal shield against the outside world.',
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop' // Old bespoke finishes image used for envelope
    },
    {
        id: '04',
        title: 'Bespoke Finishes',
        subtitle: 'ARTISANAL MILLWORK',
        description: 'The final layer is where your personality lives. Our master craftsmen meticulously install custom cabinetry, hand-selected stone, and intricate millwork. It is in these final touches that a house truly becomes your bespoke home.',
        image: 'https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1258&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Bespoke finishes
    }
];

const Process = () => {
    const containerRef = useRef(null);
    const contentRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const sections = contentRefs.current;

            sections.forEach((section, index) => {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveIndex(index);
                        }
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !contentRefs.current.includes(el)) {
            contentRefs.current.push(el);
        }
    };

    return (
        <section className="process-section" id="process" ref={containerRef}>
            {/* Sticky Background Images */}
            <div className="process-backgrounds">
                {processSteps.map((step, index) => (
                    <div
                        key={`bg-${index}`}
                        className={`process-bg-image ${index === activeIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${step.image})` }}
                        role="img"
                        aria-label={`${step.title} — ${step.subtitle}`}
                    />
                ))}
                <div className="process-bg-overlay"></div>
            </div>

            {/* Scrolling Content */}
            <div className="process-content-container">
                {processSteps.map((step, index) => (
                    <div className="process-step" key={`content-${index}`} ref={addToRefs}>
                        <div className="process-text-card">
                            <div className="process-header">
                                <span className="process-number">{step.id}</span>
                                <span className="process-subtitle">{step.subtitle}</span>
                            </div>
                            <h3 className="process-title">{step.title}</h3>
                            <p className="process-description">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
