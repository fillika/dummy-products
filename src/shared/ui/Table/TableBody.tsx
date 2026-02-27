import { type ReactNode } from "react";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import type { Column } from "./Table";

interface TableBodyProps<T> {
    data: T[];
    columns: Column<T>[];
    selectedIds?: (number | string)[];
    onRowClick?: (record: T) => void;
    getCellValue: (record: T, column: Column<T>) => ReactNode;
}

export function TableBody<T>({
    data,
    columns,
    selectedIds = [],
    onRowClick,
    getCellValue,
}: TableBodyProps<T>) {
    return (
        <tbody className="bg-transparent">
            {data.map((record, rowIndex) => {
                const recordId = (record as { id?: number | string })?.id;
                const isSelected = recordId !== undefined && selectedIds.includes(recordId);

                return (
                    <TableRow
                        key={recordId ?? rowIndex}
                        onClick={() => onRowClick?.(record)}
                        isClickable={onRowClick !== undefined}
                    >
                        {columns.map((column, colIndex) => {
                            const isFirstColumn = colIndex === 0;
                            return (
                                <TableCell
                                    key={String(column.key)}
                                    className={column.className}
                                    isFirstColumn={isFirstColumn}
                                    isSelected={isSelected && isFirstColumn}
                                >
                                    {getCellValue(record, column)}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                );
            })}
        </tbody>
    );
}
