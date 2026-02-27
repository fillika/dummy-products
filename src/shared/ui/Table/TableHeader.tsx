import { TableCell } from "./TableCell";
import type { Column } from "./Table";

interface TableHeaderProps<T> {
    columns: Column<T>[];
}

export function TableHeader<T>({ columns }: TableHeaderProps<T>) {
    return (
        <thead className="bg-transparent">
            <tr className="border-b border-[#E2E2E2]">
                {columns.map((column) => (
                    <TableCell
                        key={String(column.key)}
                        isHeader
                        className={column.className}
                        width={column.width}
                    >
                        {column.title}
                    </TableCell>
                ))}
            </tr>
        </thead>
    );
}
