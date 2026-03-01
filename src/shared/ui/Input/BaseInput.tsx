import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";

export interface BaseInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    children: ReactNode;
    id?: string;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const BaseInput = ({
    label,
    error,
    helperText,
    children,
    id,
}: BaseInputProps): React.JSX.Element => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "";
    const showMessage = error !== undefined || helperText !== undefined;

    return (
        <div className="w-full relative">
            {label !== undefined && (
                <label
                    htmlFor={inputId}
                    className="block text-[16px] font-medium text-secondary-700 mb-[6px]"
                >
                    {label}
                </label>
            )}
            {children}
            {showMessage && (
                <p
                    className="absolute -bottom-[22px] left-0 text-sm text-danger-600"
                    aria-live="polite"
                >
                    {error ?? helperText}
                </p>
            )}
        </div>
    );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className, id, ...props }, ref): React.JSX.Element => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "";

        return (
            <BaseInput label={label} error={error} helperText={helperText} id={inputId}>
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        "input h-[55px] border-[1.5px] border-[#EDEDED] rounded-[12px] px-4 text-[18px] text-[#232323] font-medium focus:outline-none focus:ring-2 focus:ring-primary-500",
                        error !== undefined && "border-danger-600 focus:ring-danger-600",
                        className
                    )}
                    {...props}
                />
            </BaseInput>
        );
    }
);

BaseInput.displayName = "BaseInput";
Input.displayName = "Input";
