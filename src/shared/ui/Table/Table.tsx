import { type ReactNode } from "react";
import { cn } from "../../lib";
import { Loader } from "../Loader";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export interface Column<T> {
    key: keyof T | string;
    title: ReactNode;
    render?: (value: T[keyof T], record: T) => ReactNode;
    className?: string;
    width?: string;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
    onRowClick?: (record: T) => void;
    selectedIds?: (number | string)[];
}

export function Table<T>({
    columns,
    data,
    isLoading = false,
    emptyMessage = "Нет данных",
    className,
    onRowClick,
    selectedIds = [],
}: TableProps<T>): React.ReactElement | null {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 h-full min-h-[400px]">
                <Loader size="lg" />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center p-12 h-full min-h-[400px] text-secondary-500">
                {emptyMessage}
            </div>
        );
    }

    const getCellValue = (record: T, column: Column<T>): ReactNode => {
        const keys = String(column.key).split(".");
        let value: unknown = record;
        for (const key of keys) {
            value = (value as Record<string, unknown>)?.[key];
        }
        return column.render ? column.render(value as T[keyof T], record) : (value as ReactNode);
    };

    return (
        <div className={cn("overflow-x-auto", className)}>
            <div className="min-w-[1024px]">
                <table className="w-full table-fixed">
                    <TableHeader columns={columns} />
                    <TableBody
                        data={data}
                        columns={columns}
                        selectedIds={selectedIds}
                        onRowClick={onRowClick}
                        getCellValue={getCellValue}
                    />
                </table>
            </div>
        </div>
    );
}
