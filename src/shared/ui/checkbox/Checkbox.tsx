import type { ChangeEvent, FC } from "react";
import { cn } from "../../lib";

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label, className, size = "md" }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.checked);
    };

    const sizeStyles = {
        sm: "w-[18px] h-[18px]",
        md: "w-[22px] h-[22px]",
        lg: "w-[24px] h-[24px]",
    };

    return (
        <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
            <div
                className={cn(
                    sizeStyles[size],
                    "border-2 border-[#ededed] rounded-[6px] flex items-center justify-center transition-colors",
                    checked ? "bg-[#3C538E] border-[#3C538E]" : "bg-white"
                )}
            >
                {checked && (
                    <svg className="w-[12px] h-[12px] text-white" fill="none" viewBox="0 0 12 12">
                        <path stroke="currentColor" strokeWidth="2" d="M2 6l3 3 5-5" />
                    </svg>
                )}
            </div>
            <input type="checkbox" className="hidden" checked={checked} onChange={handleChange} />
            {label !== undefined && (
                <span className="text-[16px] font-medium leading-[1.5] text-[#9C9C9C]">
                    {label}
                </span>
            )}
        </label>
    );
};
