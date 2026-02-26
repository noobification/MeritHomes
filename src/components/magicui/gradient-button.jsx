import React from "react";

export function GradientButton({
    children,
    size = "md",
    className = "",
    gradientColors = [
        "#ff6d1b",
        "#ffee55",
        "#5bff89",
        "#4d8aff",
        "#6b5fff",
        "#ff64f9",
        "#ff6565",
    ],
    animationSpeed = 2,
    glowEffect = true,
    glowSize = 4,
    variant = "default",
    style = {},
    ...props
}) {
    const gradientString = gradientColors.join(", ");

    const sizeStyles = {
        sm: { fontSize: "0.875rem", padding: "0.5rem 1rem", borderRadius: "9999px" },
        md: { fontSize: "1rem", padding: "0.5rem 1.5rem", borderRadius: "9999px" },
        lg: { fontSize: "1.125rem", padding: "0.75rem 2rem", borderRadius: "9999px" },
        xl: { fontSize: "1.5rem", padding: "1rem 2.5rem", borderRadius: "9999px" },
    };

    const borderStyles = {
        default: "transparent",
        outline: "currentColor",
        ghost: "transparent",
    };

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          .btn-gradient::before {
            content: "";
            background: linear-gradient(90deg, ${gradientString});
            height: 30%;
            width: 80%;
            position: absolute;
            bottom: -20%;
            z-index: 0;
            background-size: 200%;
            animation: gradient-animate ${animationSpeed}s infinite linear;
            filter: blur(calc(${glowSize} * 0.2rem));
          }

          .btn-gradient:hover::before {
            animation: gradient-animate ${animationSpeed / 4}s infinite linear;
          }

          @keyframes gradient-animate {
            0% {
              background-position: 0;
            }
            100% {
              background-position: 200%;
            }
          }

          .btn-gradient {
            animation: gradient-animate ${animationSpeed}s infinite linear;
          }
        `,
                }}
            />

            <button
                className={`btn-gradient ${className}`}
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--bg-color)", // Invert text color
                    backgroundColor: "var(--text-primary)", // Invert background
                    border: `0.15rem solid ${borderStyles[variant]}`,
                    borderColor: variant === "ghost" ? "transparent" : borderStyles[variant],
                    zIndex: 20,
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "background-color 0.2s ease",
                    background: variant === "ghost" ? `linear-gradient(90deg, ${gradientString})` : "",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box, border-box",
                    backgroundSize: "200%",
                    ...sizeStyles[size],
                    ...style,
                }}
                {...props}
            >
                {glowEffect && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-20%",
                            height: "30%",
                            width: "60%",
                            zIndex: -1,
                            filter: "blur(24px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: `linear-gradient(90deg, ${gradientString})`,
                            backgroundSize: "200%",
                            animation: `gradient-animate ${animationSpeed}s infinite linear`,
                        }}
                    />
                )}
                {children}
            </button >
        </>
    );
}

export default GradientButton;
