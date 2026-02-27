import { type FC, useState } from "react";
import { Table } from "../../shared/ui/Table";
import type { Column } from "../../shared/ui/Table";
import { formatPrice } from "../../shared/lib";
import type { Product } from "../../shared/types";
import { TableCheckbox } from "../../shared/ui/checkbox";
import { PlusIcon, SvgIcon, ThreeDotsIcon } from "../../shared/ui/icons";
import { Button } from "../../shared/ui";
import type { SortValue } from "../../shared/constants";

interface ProductListProps {
    products: Product[];
    isLoading?: boolean;
    sortValue?: SortValue;
    onSortChange?: (value: SortValue) => void;
}

export const ProductList: FC<ProductListProps> = ({
    products,
    isLoading,
    sortValue = "price-asc",
    onSortChange,
}) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
    };

    const handleSelectAll = (checked: boolean): void => {
        if (checked) {
            setSelectedIds(products.map((p) => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectProduct = (id: number, checked: boolean): void => {
        if (checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        }
    };

    const isAllSelected = products.length > 0 && selectedIds.length === products.length;

    const columns: Column<Product>[] = [
        {
            key: "checkbox",
            title: (
                <div className="flex items-center justify-center">
                    <TableCheckbox
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                    />
                </div>
            ),
            width: "3%",
            className: "text-center",
            render: (_, record) => (
                <div className="flex items-center justify-center">
                    <TableCheckbox
                        checked={selectedIds.includes(record.id)}
                        onChange={(checked) => handleSelectProduct(record.id, checked)}
                    />
                </div>
            ),
        },
        {
            key: "title",
            title: "Наименование",
            width: "25%",
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
            width: "13%",
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
            width: "13%",
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
            width: "10%",
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
            width: "13%",
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
            width: "23%",
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
    ];

    return (
        <Table
            columns={columns}
            data={products}
            isLoading={isLoading}
            emptyMessage="Товары не найдены"
            selectedIds={selectedIds}
        />
    );
};

const formatRating = (rating: number): string => {
    return rating.toFixed(1);
};
