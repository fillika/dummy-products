import { type FC } from "react";
import { Table } from "../../shared/ui/Table";
import type { Column } from "../../shared/ui/Table";
import { formatPrice, formatRating, cn } from "../../shared/lib";
import { LOW_RATING_THRESHOLD } from "../../shared/constants";
import type { Product } from "../../shared/types";

interface ProductListProps {
    products: Product[];
    isLoading?: boolean;
    sortValue?: string;
    onSortChange?: (value: string) => void;
}

export const ProductList: FC<ProductListProps> = ({
    products,
    isLoading,
    sortValue = "price-asc",
    onSortChange,
}) => {
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
            onSortChange(currentOrder === "asc" ? `${field}-desc` : `${field}-asc`);
        } else {
            onSortChange(`${field}-asc`);
        }
    };

    const columns: Column<Product>[] = [
        {
            key: "thumbnail",
            title: "Image",
            render: (value) => (
                <img src={value as string} alt="" className="w-16 h-16 object-cover rounded-lg" />
            ),
        },
        {
            key: "title",
            title: "Name",
            className: "max-w-xs truncate",
        },
        {
            key: "brand",
            title: "Brand",
        },
        {
            key: "category",
            title: "Category",
        },
        {
            key: "price",
            title: onSortChange ? (
                <button
                    type="button"
                    onClick={() => handleSortClick("price")}
                    className="flex items-center gap-1 hover:text-primary-500 transition-colors"
                >
                    Price <span className="text-xs">{getSortIcon("price")}</span>
                </button>
            ) : (
                "Price"
            ),
            render: (value) => <span className="font-medium">{formatPrice(value as number)}</span>,
        },
        {
            key: "rating",
            title: onSortChange ? (
                <button
                    type="button"
                    onClick={() => handleSortClick("rating")}
                    className="flex items-center gap-1 hover:text-primary-500 transition-colors"
                >
                    Rating <span className="text-xs">{getSortIcon("rating")}</span>
                </button>
            ) : (
                "Rating"
            ),
            render: (value) => (
                <span
                    className={cn(
                        "px-2 py-1 rounded-full text-sm font-medium",
                        (value as number) < LOW_RATING_THRESHOLD && "bg-danger-100 text-danger-800"
                    )}
                >
                    {formatRating(value as number)}/5
                </span>
            ),
        },
        {
            key: "stock",
            title: "Stock",
        },
    ];

    return (
        <div className="card">
            <Table
                columns={columns}
                data={products}
                isLoading={isLoading}
                emptyMessage="No products found"
            />
        </div>
    );
};
