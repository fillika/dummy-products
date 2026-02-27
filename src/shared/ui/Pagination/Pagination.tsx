import { type FC } from "react";
import { cn } from "../../lib";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { Button } from "../Button";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
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
        <div className={cn("flex items-center justify-between h-[52px]", className)}>
            <div className="font-roboto font-normal text-[18px] leading-[21px] text-[#969B9F]">
                Показано <span className="text-[#000]">{startItem}-{endItem}</span> из <span className="text-[#000]">{totalItems}</span>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="none"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeftIcon />
                </Button>

                <div className="flex items-center gap-[16px]">
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="font-cairo font-normal text-[14px] leading-[26px] text-[#969B9F]"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={`page-${page}`}
                                variant="none"
                                onClick={() => onPageChange(page as number)}
                                className={cn(
                                    "w-[30px] h-[30px] !rounded-[4px] flex justify-center items-center transition-opacity hover:opacity-80",
                                    currentPage === page
                                        ? "bg-[#797FEA] shadow-[0px_20px_50px_rgba(0,0,0,0.12)]"
                                        : "bg-transparent border border-[#ECECEB] drop-shadow-[0px_20px_50px_rgba(0,0,0,0.12)]"
                                )}
                            >
                                <span className={cn(
                                    "font-cairo font-normal text-[14px] leading-[26px]",
                                    currentPage === page ? "text-[#FFFFFF]" : "text-[#B2B3B9]"
                                )}>
                                    {page}
                                </span>
                            </Button>
                        )
                    )}
                </div>

                <Button
                    variant="none"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRightIcon />
                </Button>
            </div>
        </div>
    );
};
