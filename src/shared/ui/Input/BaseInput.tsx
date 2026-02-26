import type { ReactNode } from "react";
import { cn } from "../../lib";

export interface BaseInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    children: ReactNode;
    id?: string;
}

export const BaseInput = ({
    label,
    error,
    helperText,
    children,
    id,
}: BaseInputProps) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-[18px] font-medium text-secondary-700 mb-[6px]"
                >
                    {label}
                </label>
            )}
            {children}
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
};

BaseInput.displayName = "BaseInput";
