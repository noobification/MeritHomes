import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './LuxeButton.css';

const LuxeButton = ({ children, onClick, className = '' }) => {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const button = buttonRef.current;

        if (!container || !button) return;

        let rect = container.getBoundingClientRect();

        const updateRect = () => {
            rect = container.getBoundingClientRect();
        };

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = rect;

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 100;

            if (distance < maxDistance) {
                // Magnetic pull
                gsap.to(button, {
                    x: deltaX * 0.3,
                    y: deltaY * 0.3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        };

        const onMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)"
            });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', updateRect, { passive: true });
        window.addEventListener('resize', updateRect);
        container.addEventListener('mouseleave', onMouseLeave);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', updateRect);
            window.removeEventListener('resize', updateRect);
            container.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className={`luxe-btn-container ${className}`}>
            <button
                ref={buttonRef}
                className="luxe-btn"
                onClick={onClick}
            >
                {/* Light Beam Border */}
                <div className="luxe-btn-beam"></div>

                {/* Molten Gold Interior */}
                <div className="molten-container">
                    <div className="molten-blob blob-1"></div>
                    <div className="molten-blob blob-2"></div>
                    <div className="molten-blob blob-3"></div>
                </div>

                {/* Shine Layer */}
                <div className="luxe-btn-shine"></div>

                {/* Content */}
                <div className="luxe-btn-content">
                    <span className="luxe-btn-text">{children}</span>
                </div>
            </button>
        </div>
    );
};

export default LuxeButton;
