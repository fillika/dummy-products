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

    return (
        <div className="w-full">
            {label !== undefined && (
                <label
                    htmlFor={inputId}
                    className="block text-[18px] font-medium text-secondary-700 mb-[6px]"
                >
                    {label}
                </label>
            )}
            {children}
            {(error !== undefined || helperText !== undefined) && (
                <p
                    className={cn(
                        "mt-1 text-sm",
                        error !== undefined ? "text-danger-600" : "text-secondary-500"
                    )}
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
