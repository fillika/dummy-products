import { Table } from "../../shared/ui/Table";
import type { Column } from "../../shared/ui/Table";
import { formatPrice, formatRating, cn } from "../../shared/lib";
import { LOW_RATING_THRESHOLD } from "../../shared/constants";
import type { Product } from "../../shared/types";

interface ProductListProps {
    products: Product[];
    isLoading?: boolean;
}

export const ProductList = ({ products, isLoading }: ProductListProps) => {
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
            title: "Price",
            render: (value) => <span className="font-medium">{formatPrice(value as number)}</span>,
        },
        {
            key: "rating",
            title: "Rating",
            render: (value) => (
                <span
                    className={cn(
                        "px-2 py-1 rounded-full text-sm font-medium",
                        (value as number) < LOW_RATING_THRESHOLD
                            ? "bg-danger-100 text-danger-800"
                            : "bg-success-100 text-success-800"
                    )}
                >
                    ★ {formatRating(value as number)}
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
