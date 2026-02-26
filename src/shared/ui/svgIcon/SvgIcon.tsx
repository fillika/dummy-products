import type { ReactNode } from "react";
import { cn } from "../../lib";

export interface SvgIconProps {
    children: ReactNode;
    className?: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    color?: string;
}

export const SvgIcon = ({
    children,
    className,
    size,
    width,
    height,
    color,
}: SvgIconProps) => {
    const style: React.CSSProperties = {};

    if (size) {
        const sizeValue = typeof size === "number" ? `${size}px` : size;
        style.width = sizeValue;
        style.height = sizeValue;
    } else {
        if (width) {
            style.width = typeof width === "number" ? `${width}px` : width;
        }
        if (height) {
            style.height = typeof height === "number" ? `${height}px` : height;
        }
    }

    if (color) {
        style.color = color;
    }

    return (
        <span className={cn("inline-flex items-center justify-center", className)} style={style}>
            {children}
        </span>
    );
};
