import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

export function AuroraText({
    className,
    children,
    as: Component = "span",
    ...props
}) {
    const MotionComponent = motion(Component);

    return (
        <MotionComponent
            className={cn("aurora-text-container", className)}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}
