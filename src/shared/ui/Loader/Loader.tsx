import { type FC } from "react";
import { cn } from "../../lib";

export interface LoaderProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = "md", className }) => {
    const sizeStyles = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div
                className={cn(
                    "animate-spin rounded-full border-4 border-secondary-200 border-t-primary-600",
                    sizeStyles[size]
                )}
                role="status"
                aria-label="Loading"
            />
        </div>
    );
};

export const Spinner = Loader;
