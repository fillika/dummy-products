import type { FC } from "react";
import { cn } from "../../lib";

export interface TableCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const TableCheckbox: FC<TableCheckboxProps> = ({ checked, onChange }) => {
    const handleChange = (): void => {
        onChange(!checked);
    };

    return (
        <div
            onClick={handleChange}
            className={cn(
                "w-[22px] h-[22px] rounded-[4px] border-1 cursor-pointer transition-colors flex-shrink-0",
                checked
                    ? "bg-[#3C538E] border-[#3C538E]"
                    : "bg-white border-[#E2E2E2]"
            )}
        />
    );
};
