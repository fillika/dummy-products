import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "none";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", children, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-[8px] p-2.5";

        const variantStyles = {
            primary: "bg-[#242EDB] text-white hover:bg-[#1e25b8] border border-[#367AFF] shadow-[0px_8px_8px_rgba(54,122,255,0.03),inset_0px_-2px_0px_1px_rgba(0,0,0,0.08)]",
            secondary:
                "bg-secondary-200 text-secondary-800 hover:bg-secondary-100",
            danger: "bg-danger-600 text-white hover:bg-danger-500",
            ghost: "bg-transparent text-secondary-600 hover:bg-secondary-100 border border-[#ececeb]",
            none: "",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, (variant !== "none" && variantStyles[variant]), className)}
                disabled={props.disabled === true}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
