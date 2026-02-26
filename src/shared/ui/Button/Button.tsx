import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

        const variantStyles = {
            primary: "bg-primary-600 text-white hover:bg-primary-500 focus:ring-primary-500",
            secondary:
                "bg-secondary-200 text-secondary-800 hover:bg-secondary-100 focus:ring-secondary-500",
            danger: "bg-danger-600 text-white hover:bg-danger-500 focus:ring-danger-500",
            ghost: "bg-transparent text-secondary-600 hover:bg-secondary-100 focus:ring-secondary-500",
        };

        const sizeStyles = {
            sm: "px-3 py-1.5 text-sm gap-2",
            md: "px-4 py-2 text-base gap-2",
            lg: "px-6 py-3 text-lg gap-2",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
                {...props}
            >
                {leftIcon}
                {children}
                {rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";
