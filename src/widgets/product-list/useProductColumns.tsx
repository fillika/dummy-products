import { useMemo } from "react";
import type { Column } from "../../shared/ui/Table";
import type { Product } from "../../shared/types";
import type { SortValue } from "../../shared/constants";
import { TableCheckbox } from "../../shared/ui/checkbox";
import { PlusIcon, SvgIcon, ThreeDotsIcon } from "../../shared/ui/icons";
import { Button } from "../../shared/ui";
import { formatPrice } from "../../shared/lib";

interface UseProductColumnsProps {
    sortValue: SortValue;
    onSortChange?: (value: SortValue) => void;
    currentSelectAll: boolean;
    currentSelectedIds: number[];
    currentExcludedIds: number[];
    setCurrentSelection: (params: {
        selectedIds?: number[];
        selectAll?: boolean;
        excludedIds?: number[];
    }) => void;
}

export const useProductColumns = ({
    sortValue,
    onSortChange,
    currentSelectAll,
    currentSelectedIds,
    currentExcludedIds,
    setCurrentSelection,
}: UseProductColumnsProps): Column<Product>[] => {
    const getSortIcon = (field: string): string => {
        if (!onSortChange) return "";
        const [currentField, currentOrder] = sortValue.split("-");
        if (currentField !== field) return "↕";
        return currentOrder === "asc" ? "↑" : "↓";
    };

    const handleSortClick = (field: string): void => {
        if (!onSortChange) return;
        const [currentField, currentOrder] = sortValue.split("-");
        if (currentField === field) {
            onSortChange(`${field}-${currentOrder === "asc" ? "desc" : "asc"}` as SortValue);
        } else {
            onSortChange(`${field}-asc` as SortValue);
        }
        setCurrentSelection({ selectedIds: [], selectAll: false, excludedIds: [] });
    };

    const handleSelectAll = (checked: boolean): void => {
        if (checked) {
            setCurrentSelection({ selectAll: true, excludedIds: [] });
        } else {
            setCurrentSelection({ selectAll: false, excludedIds: [], selectedIds: [] });
        }
    };

    const handleSelectProduct = (id: number, checked: boolean): void => {
        if (currentSelectAll) {
            if (!checked) {
                setCurrentSelection({ excludedIds: [...currentExcludedIds, id] });
            } else {
                setCurrentSelection({ excludedIds: currentExcludedIds.filter((eid) => eid !== id) });
            }
            return;
        }

        if (checked) {
            setCurrentSelection({ selectedIds: [...currentSelectedIds, id] });
        } else {
            setCurrentSelection({ selectedIds: currentSelectedIds.filter((sid) => sid !== id) });
        }
    };

    const isItemSelected = (id: number): boolean => {
        if (currentSelectAll) {
            return !currentExcludedIds.includes(id);
        }
        return currentSelectedIds.includes(id);
    };

    const isAllSelectedGlobal = currentSelectAll && currentExcludedIds.length === 0;

    return useMemo(
        () => [
            {
                key: "checkbox",
                title: (
                    <div className="flex items-center justify-center">
                        <TableCheckbox checked={isAllSelectedGlobal} onChange={handleSelectAll} />
                    </div>
                ),
                width: "22px",
                className: "text-center",
                render: (_, record) => (
                    <div className="flex items-center justify-center">
                        <TableCheckbox
                            checked={isItemSelected(record.id)}
                            onChange={(checked) => handleSelectProduct(record.id, checked)}
                        />
                    </div>
                ),
            },
            {
                key: "title",
                title: "Наименование",
                width: "18.9%",
                className: "text-left",
                render: (_, record) => (
                    <div className="flex items-center gap-[18px]">
                        <img
                            src={record.thumbnail}
                            alt={record.title}
                            className="w-[48px] h-[48px] object-cover rounded-[8px] flex-shrink-0"
                        />
                        <div className="min-w-0 flex flex-col justify-center">
                            <div className="font-cairo font-bold text-[16px] text-[#222222] truncate">
                                {record.title}
                            </div>
                            <div className="font-cairo font-normal text-[14px] text-[#B2B3B9] truncate">
                                {record.category}
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                key: "brand",
                title: "Вендор",
                width: "20%",
                className: "text-center",
                render: (value) => (
                    <span className="font-cairo font-bold text-[16px] leading-[22px] text-[#000000] text-center block">
                        {value as string}
                    </span>
                ),
            },
            {
                key: "sku",
                title: "Артикул",
                width: "9.5%",
                className: "text-center",
                render: () => (
                    <span className="font-cairo font-normal text-[16px] leading-[22px] text-[#000000] text-center block">
                        SKU-001
                    </span>
                ),
            },
            {
                key: "rating",
                title: onSortChange ? (
                    <button
                        type="button"
                        onClick={() => handleSortClick("rating")}
                        className="flex items-center gap-1 hover:text-primary-500 transition-colors mx-auto cursor-pointer"
                    >
                        Оценка <span className="text-xs">{getSortIcon("rating")}</span>
                    </button>
                ) : (
                    "Оценка"
                ),
                width: "21%",
                className: "text-center",
                render: (value) => {
                    const rating = value as number;
                    const isLowRating = rating < 3;
                    return (
                        <span className="font-cairo font-normal text-[16px] leading-[22px]">
                            <span className={isLowRating ? "text-[#F11010]" : "text-[#000000]"}>
                                {formatRating(rating)}
                            </span>
                            /5
                        </span>
                    );
                },
            },
            {
                key: "price",
                title: onSortChange ? (
                    <button
                        type="button"
                        onClick={() => handleSortClick("price")}
                        className="flex items-center gap-1 hover:text-primary-500 transition-colors mx-auto cursor-pointer"
                    >
                        Цена, ₽ <span className="text-xs">{getSortIcon("price")}</span>
                    </button>
                ) : (
                    "Цена, ₽"
                ),
                width: "9%",
                className: "text-center",
                render: (value) => {
                    const price = value as number;
                    const formatted = formatPrice(price);
                    const [integerPart, decimalPart] = formatted.split(",");
                    return (
                        <span className="font-roboto-mono font-normal text-[16px] leading-[110%] text-[#222222]">
                            {integerPart}
                            <span className="text-[#9C9C9C]">,{decimalPart}</span>
                        </span>
                    );
                },
            },
            {
                key: "actions",
                title: "",
                width: "20%",
                className: "text-center",
                render: () => (
                    <div className="flex items-center justify-center gap-[32px]">
                        <Button className="py-[1px] px-[14px] !rounded-[23px]">
                            <SvgIcon size={24}>
                                <PlusIcon />
                            </SvgIcon>
                        </Button>
                        <SvgIcon size={26} className="cursor-pointer">
                            <ThreeDotsIcon />
                        </SvgIcon>
                    </div>
                ),
            },
        ],
        [
            onSortChange,
            sortValue,
            currentSelectAll,
            currentSelectedIds,
            currentExcludedIds,
            setCurrentSelection,
        ],
    );
};

const formatRating = (rating: number): string => {
    return rating.toFixed(1);
};
