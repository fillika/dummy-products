import type { ChangeEvent, FC } from "react";
import { cn } from "../../lib";

export interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label, className }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.checked);
    };

    return (
        <label className={cn("flex items-center gap-2 cursor-pointer", className)}>
            <div
                className={`
                w-[18px] h-[18px]
                border-2 border-[#ededed]
                rounded-[6px]
                flex items-center justify-center
                transition-colors
                ${checked ? "bg-blue-500 border-blue-500" : "bg-white"}
            `}
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
