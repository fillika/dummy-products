import { type FC } from "react";
import { Pagination as PaginationUI } from "../../shared/ui/Pagination";

interface PaginationWidgetProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationWidgetProps> = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
}: PaginationWidgetProps) => {
    const itemsPerPage = 5;

    return (
        <div className="mt-4">
            <PaginationUI
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};
