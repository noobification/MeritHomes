"use client"

import React, { useEffect, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

export function MagicCard({
    children,
    className,
    gradientSize = 400,
    gradientColor = "rgba(188, 155, 106, 0.08)", // subtle gold inner glow
    gradientOpacity = 0.8,
    gradientFrom = "rgba(188, 155, 106, 0.4)", // strong gold border
    gradientTo = "transparent",
}) {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        let animationFrame;
        const duration = 6000; // 6 seconds per loop

        const loop = (time) => {
            if (!containerRef.current) {
                animationFrame = requestAnimationFrame(loop);
                return;
            }

            const progress = (time % duration) / duration;
            const angle = progress * Math.PI * 2;

            const rect = containerRef.current.getBoundingClientRect();

            // Calculate center points
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Set radius to trace the absolute edges of the rectangle
            const radiusX = rect.width / 2;
            const radiusY = rect.height / 2;

            // Trace the ellipse perimeter
            mouseX.set(centerX + radiusX * Math.cos(angle));
            mouseY.set(centerY + radiusY * Math.sin(angle));

            animationFrame = requestAnimationFrame(loop);
        };

        animationFrame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrame);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* The animated gradient border */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                    background: useMotionTemplate`
                        radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
                        ${gradientFrom}, 
                        ${gradientTo}
                        )
                    `,
                }}
            />

            {/* The inner background block - using the luxury theme's off-white translucent background */}
            <div
                style={{
                    position: 'absolute',
                    top: '1px', left: '1px', right: '1px', bottom: '1px',
                    borderRadius: 'inherit',
                    backgroundColor: 'rgba(245, 242, 235, 0.90)', // var(--bg-color) with opacity
                    backdropFilter: 'blur(8px)'
                }}
            />

            {/* The internal spotlight effect (optional, illuminates background) */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '1px', left: '1px', right: '1px', bottom: '1px',
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                    background: useMotionTemplate`
                        radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
                    `,
                    opacity: gradientOpacity,
                }}
            />

            {/* Content wrapper */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
                {children}
            </div>
        </div>
    )
}
