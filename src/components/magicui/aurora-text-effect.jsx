import React from "react";

export function AuroraTextEffect({
    text,
    className = "",
    textClassName = "",
    fontSize = "inherit",
    colors = {
        first: "var(--accent-gold)",
        second: "#f8e5a5",
        third: "#b8860b",
        fourth: "#ffffff",
    },
    animationSpeed = {
        first: 5,
        second: 7,
    },
}) {
    const keyframes = `
    @keyframes aurora-text-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

    return (
        <span
            className={className}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            <style>{keyframes}</style>
            <span
                className={textClassName}
                style={{
                    display: "inline-block",
                    fontSize,
                    background: `linear-gradient(90deg, ${colors.first}, ${colors.second}, ${colors.fourth}, ${colors.third}, ${colors.first})`,
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: `aurora-text-shift ${animationSpeed.first}s ease-in-out infinite`,
                }}
            >
                {text}
            </span>
        </span>
    );
}

export default AuroraTextEffect;
