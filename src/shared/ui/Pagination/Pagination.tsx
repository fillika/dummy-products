import { type FC, useMemo } from "react";
import { cn } from "../../lib";
import { getPageNumbers } from "../../lib/pagination";
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

    const pageNumbers = useMemo(
        () => getPageNumbers(currentPage, totalPages),
        [currentPage, totalPages]
    );

    return (
        <div className={cn("h-[52px] flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between", className)}>
            <div className="font-roboto font-normal text-[18px] leading-[21px] text-[#969B9F]">
                Показано <span className="text-[#000]">{startItem}-{endItem}</span> из <span className="text-[#000]">{totalItems}</span>
            </div>

            <div className="flex items-center gap-3 ml-[-6px]">
                <Button
                    variant="none"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="!p-2"
                >
                    <ChevronLeftIcon />
                </Button>

                <div className="flex items-center gap-[8px]">
                    {pageNumbers.map((page, index) =>
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
