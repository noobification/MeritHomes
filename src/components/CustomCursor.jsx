import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const posRef = useRef({ x: 0, y: 0 });
    const trailPosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Detect hoverable elements
        const addHoverListeners = () => {
            const interactives = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, .nav-link, .gradient-button'
            );
            interactives.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        // Use MutationObserver to re-attach listeners when DOM changes
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Animation loop for smooth trailing
        let raf;
        const animate = () => {
            const cursor = cursorRef.current;
            const trail = trailRef.current;
            if (!cursor || !trail) { raf = requestAnimationFrame(animate); return; }

            // Cursor follows mouse instantly
            cursor.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;

            // Trail follows with easing
            trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.15;
            trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.15;
            trail.style.transform = `translate(${trailPosRef.current.x}px, ${trailPosRef.current.y}px)`;

            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return null;
    }

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor-dot ${isHovering ? 'hovering' : ''} ${isHidden ? 'hidden' : ''}`}
            />
            <div
                ref={trailRef}
                className={`custom-cursor-ring ${isHovering ? 'hovering' : ''} ${isHidden ? 'hidden' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
