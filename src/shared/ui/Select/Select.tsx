import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, options, id, ...props }, ref) => {
        const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "";

        return (
            <div className="w-full">
                {label !== undefined && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-secondary-700 mb-1"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={cn(
                        "input",
                        error !== undefined && "input-error",
                        "cursor-pointer",
                        className
                    )}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
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
    }
);

Select.displayName = "Select";
