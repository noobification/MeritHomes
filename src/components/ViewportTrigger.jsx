import React, { useState, useEffect, useRef, Suspense } from 'react';

const ViewportTrigger = ({ children, fallback = <div className="h-screen bg-background" /> }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' } // Pre-load slightly before it enters the viewport
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {isVisible ? (
                <Suspense fallback={fallback}>
                    {children}
                </Suspense>
            ) : (
                fallback
            )}
        </div>
    );
};

export default ViewportTrigger;
