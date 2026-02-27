import { type ReactNode } from "react";
import { cn } from "../../lib";

interface TableRowProps {
    children: ReactNode;
    onClick?: () => void;
    isClickable?: boolean;
}

export function TableRow({
    children,
    onClick,
    isClickable = false,
}: TableRowProps) {
    return (
        <tr
            onClick={onClick}
            className={cn(
                "border-b border-[#E2E2E2]",
                isClickable && "cursor-pointer hover:bg-[#F9F9F9] transition-colors"
            )}
        >
            {children}
        </tr>
    );
}
