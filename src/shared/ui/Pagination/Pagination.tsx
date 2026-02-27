import { type FC } from "react";
import { cn } from "../../lib";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
    className?: string;
}

export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    className,
}: PaginationProps) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }

        return pages;
    };

    return (
        <div className={cn("flex items-center justify-between", className)}>
            <div className="text-sm text-secondary-600">
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            <div className="flex items-center gap-4">
                {onItemsPerPageChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-secondary-600">Per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="border border-secondary-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-secondary-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100 transition-colors"
                    >
                        Previous
                    </button>

                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-1 text-secondary-500"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={`page-${page}`}
                                onClick={() => onPageChange(page as number)}
                                className={cn(
                                    "px-3 py-1 border rounded text-sm transition-colors",
                                    currentPage === page
                                        ? "bg-primary-600 text-white border-primary-600"
                                        : "border-secondary-300 hover:bg-secondary-100"
                                )}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-secondary-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-100 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
