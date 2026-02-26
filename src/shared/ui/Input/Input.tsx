import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-secondary-700 mb-1"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn("input", error && "input-error", className)}
                    {...props}
                />
                {(error || helperText) && (
                    <p
                        className={cn(
                            "mt-1 text-sm",
                            error ? "text-danger-600" : "text-secondary-500"
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
