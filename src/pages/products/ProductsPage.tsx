import { type FC, useState, useMemo } from "react";
import { Header } from "../../widgets/header";
import { ProductList } from "../../widgets/product-list";
import { Pagination } from "../../widgets/pagination";
import { AddProduct } from "../../features/add-product/ui";
import { useGetProductsQuery } from "../../entities/product";
import { DEFAULT_PAGINATION } from "../../shared/constants";
import type { SortParams } from "../../shared/types";

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
                <div className="px-2 lg:px-[30px]">

                </div>
                <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
                    <AddProduct />
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
            </main>
        </div>
    );
};
