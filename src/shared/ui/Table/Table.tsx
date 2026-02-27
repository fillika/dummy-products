import { type ReactNode } from "react";
import { cn } from "../../lib";

export interface Column<T> {
    key: keyof T | string;
    title: ReactNode;
    render?: (value: T[keyof T], record: T) => ReactNode;
    className?: string;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
    onRowClick?: (record: T) => void;
}

export function Table<T>({
    columns,
    data,
    isLoading = false,
    emptyMessage = "No data available",
    className,
    onRowClick,
}: TableProps<T>): React.ReactElement | null {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                {/* todo: loader */}
                <div className="text-secondary-500">Loading...</div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 text-secondary-500">
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
            <table className="min-w-full divide-y divide-secondary-200">
                <thead className="bg-secondary-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={cn(
                                    "px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider",
                                    column.className
                                )}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-secondary-200">
                    {data.map((record, rowIndex) => (
                        <tr
                            key={(record as { id?: number | string })?.id ?? rowIndex}
                            onClick={() => onRowClick?.(record)}
                            className={cn(
                                onRowClick !== undefined &&
                                    "cursor-pointer hover:bg-secondary-50 transition-colors"
                            )}
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className={cn(
                                        "px-6 py-4 whitespace-nowrap text-sm text-secondary-900",
                                        column.className
                                    )}
                                >
                                    {getCellValue(record, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
