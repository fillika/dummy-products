import { type FC, type ReactNode } from "react";
import { cn } from "../../lib";

export interface SvgIconProps {
    children: ReactNode;
    className?: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    color?: string;
}

export const SvgIcon: FC<SvgIconProps> = ({ children, className, size, width, height, color }) => {
    const style: React.CSSProperties = {};

    if (size !== undefined) {
        const sizeValue = typeof size === "number" ? `${size}px` : size;
        style.width = sizeValue;
        style.height = sizeValue;
    } else {
        if (width !== undefined) {
            style.width = typeof width === "number" ? `${width}px` : width;
        }
        if (height !== undefined) {
            style.height = typeof height === "number" ? `${height}px` : height;
        }
    }

    if (color !== undefined) {
        style.color = color;
    }

    return (
        <span className={cn("inline-flex items-center justify-center", className)} style={style}>
            {children}
        </span>
    );
};
