import { type ReactNode } from "react";
import { cn } from "../../lib";

interface TableCellProps {
    children: ReactNode;
    className?: string;
    isFirstColumn?: boolean;
    isHeader?: boolean;
    width?: string;
    isSelected?: boolean;
}

export function TableCell({
    children,
    className,
    isFirstColumn = false,
    isHeader = false,
    width,
    isSelected = false,
}: TableCellProps) {
    const baseClasses = cn(
        "px-[18px] py-0 text-[16px] font-cairo font-bold leading-[30px] text-[#B2B3B9] tracking-wider truncate",
        className
    );

    const cellClasses = cn(
        "py-0 text-[14px] text-[#202020] truncate relative",
        isFirstColumn ? "pl-[18px] pr-[18px]" : "px-[18px]",
        className
    );

    if (isHeader) {
        return (
            <th
                className={baseClasses}
                style={{ width, height: "73px" }}
            >
                {children}
            </th>
        );
    }

    return (
        <td
            className={cellClasses}
            style={{ height: "71px" }}
        >
            {isSelected && (
                <div className="absolute inset-y-0 left-0 w-[3px] bg-[#3C538E]" />
            )}
            {children}
        </td>
    );
}
