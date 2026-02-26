import React, { useRef, useEffect, useState } from "react";
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ThreeDHoverGallery = ({
    images = [],
    imageAlts = [],
    itemWidth = 12,
    itemHeight = 20,
    gap = 1.2,
    perspective = 50,
    hoverScale = 15,
    transitionDuration = 1.25,
    backgroundColor,
    grayscaleStrength = 1,
    brightnessLevel = 0.5,
    activeWidth = 45,
    rotationAngle = 35,
    zDepth = 10,
    enableKeyboardNavigation = true,
    autoPlay = false,
    autoPlayDelay = 3000,
    className,
    style,
    onImageClick,
    onImageHover,
    onImageFocus,
}) => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const autoPlayRef = useRef(null);

    // Effect for auto-play functionality
    useEffect(() => {
        if (autoPlay && images.length > 0) {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => {
                    const nextIndex = prev === null ? 0 : (prev + 1) % images.length;
                    return nextIndex;
                });
            }, autoPlayDelay);

            return () => {
                if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                }
            };
        }
        if (!autoPlay && autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, [autoPlay, autoPlayDelay, images.length]);

    // Handle mobile responsiveness dynamically
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageClick = (index, image) => {
        setActiveIndex(activeIndex === index ? null : index);
        onImageClick?.(index, image);
    };

    const handleImageHover = (index, image) => {
        if (!autoPlay) {
            setActiveIndex(index);
        }
        onImageHover?.(index, image);
    };

    const handleImageLeave = () => {
        if (!autoPlay) {
            setActiveIndex(null);
        }
    };

    const handleImageFocus = (index, image) => {
        setFocusedIndex(index);
        onImageFocus?.(index, image);
    };

    const handleKeyDown = (event, index) => {
        if (!enableKeyboardNavigation) return;

        switch (event.key) {
            case "Enter":
            case " ":
                event.preventDefault();
                handleImageClick(index, images[index]);
                break;
            case "ArrowLeft":
                event.preventDefault();
                const prevIndex = index > 0 ? index - 1 : images.length - 1;
                containerRef.current?.children[prevIndex]?.focus();
                break;
            case "ArrowRight":
                event.preventDefault();
                const nextIndex = index < images.length - 1 ? index + 1 : 0;
                containerRef.current?.children[nextIndex]?.focus();
                break;
        }
    };

    const getItemStyle = (index) => {
        const isActive = activeIndex === index;
        const isFocused = focusedIndex === index;

        let currentActiveWidth = isMobile ? 80 : activeWidth;
        let currentItemWidth = isMobile ? 10 : itemWidth;
        let currentHoverScale = isMobile ? 5 : hoverScale;
        let currentOpacity = 1;
        let baseWidthPx = 10;
        let activeMargin = "0 0.45vw";

        if (isMobile && activeIndex !== null) {
            if (isActive) {
                baseWidthPx = 0;
                activeMargin = "0";
            } else {
                currentItemWidth = 0;
                baseWidthPx = 0;
                currentOpacity = 0;
            }
        }

        return {
            width: isActive
                ? `${currentActiveWidth}vw`
                : `calc(${currentItemWidth}vw + ${baseWidthPx}px)`,
            height: `calc(${itemHeight}vw + ${itemHeight}vh)`,
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor,
            cursor: "pointer",
            filter:
                isActive || isFocused
                    ? "inherit"
                    : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
            transform: isActive
                ? `translateZ(calc(${currentHoverScale}vw + ${currentHoverScale}vh))`
                : "none",
            transition: `transform ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), filter ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), width ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), opacity ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), margin ${transitionDuration}s cubic-bezier(.1, .7, 0, 1)`,
            willChange: "transform, filter, width, opacity",
            zIndex: isActive ? 100 : "auto",
            margin: isActive ? activeMargin : "0",
            outline: isFocused ? "2px solid #3b82f6" : "none",
            outlineOffset: "2px",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" // Added native shadow since we don't have Tailwind
        };
    };

    return (
        <div
            className={cn(className)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '100vh',
                overflow: 'hidden',
                backgroundColor: backgroundColor || 'transparent',
                ...style
            }}
        >
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    transformStyle: 'preserve-3d',
                    perspective: isMobile ? `calc(${perspective * 0.8}vw + ${perspective * 0.8}vh)` : `calc(${perspective}vw + ${perspective}vh)`,
                    gap: isMobile && activeIndex !== null ? '0rem' : `${gap}rem`,
                    transition: `gap ${transitionDuration}s cubic-bezier(.1, .7, 0, 1)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={getItemStyle(index)}
                        tabIndex={enableKeyboardNavigation ? 0 : -1}
                        onClick={() => handleImageClick(index, image)}
                        onMouseEnter={() => handleImageHover(index, image)}
                        onMouseLeave={handleImageLeave}
                        onFocus={() => handleImageFocus(index, image)}
                        onBlur={() => setFocusedIndex(null)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        role="img"
                        aria-label={imageAlts[index] || `Gallery image ${index + 1} of ${images.length}`}
                        aria-pressed={activeIndex === index}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThreeDHoverGallery;
