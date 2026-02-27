import { type FC, useState, useMemo } from "react";
import { Header } from "../../widgets/header";
import { ProductList } from "../../widgets/product-list";
import { Pagination } from "../../widgets/pagination";
import { AddProduct } from "../../features/add-product/ui";
import { useGetProductsQuery } from "../../entities/product";
import { DEFAULT_PAGINATION } from "../../shared/constants";
import type { SortParams } from "../../shared/types";
import { RefreshButton } from "../../features/refresh-products/ui/RefreshButton";

export const ProductsPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PAGINATION.limit);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortValue, setSortValue] = useState("price-asc");

    const { sortBy, order } = useMemo((): SortParams => {
        const [field, dir] = sortValue.split("-");
        return {
            sortBy: field as SortParams["sortBy"],
            order: dir as SortParams["order"],
        };
    }, [sortValue]);

    const { data, isLoading } = useGetProductsQuery({
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        sortBy,
        order,
        q: searchQuery,
    });

    const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newLimit: number): void => {
        setItemsPerPage(newLimit);
        setCurrentPage(1);
    };

    const handleSortChange = (value: string): void => {
        setSortValue(value);
        setCurrentPage(1);
    };

    const handleSearch = (query: string): void => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <Header onSearch={handleSearch} />
            <main className="w-full bg-[#fff]">
                <div className="px-2 lg:px-[30px] py-7.5">
                    <div className="flex justify-between gap-4 items-center mb-10">
                        <span className="font-bold text-[20px] text-[#202020] leading-[1] font-cairo">Все позиции</span>
                        <div className="flex gap-2">
                            <RefreshButton />
                            <AddProduct />
                        </div>
                    </div>

                    <ProductList
                        products={data?.products || []}
                        isLoading={isLoading}
                        sortValue={sortValue}
                        onSortChange={handleSortChange}
                    />

                    {data && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={data.total}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};
