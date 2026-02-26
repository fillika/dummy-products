import { useState, useMemo } from "react";
import { Header } from "../../widgets/header";
import { ProductList } from "../../widgets/product-list";
import { Pagination } from "../../widgets/pagination";
import { Search } from "../../features/search/ui";
import { Sort } from "../../features/sort/ui";
import { AddProduct } from "../../features/add-product/ui";
import { useGetProductsQuery } from "../../entities/product";
import { DEFAULT_PAGINATION } from "../../shared/constants";
import type { SortParams } from "../../shared/types";

export const ProductsPage = () => {
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newLimit: number) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSortChange = (value: string) => {
        setSortValue(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <Search onSearch={handleSearch} />
                        <div className="w-full sm:w-auto">
                            <Sort value={sortValue} onChange={handleSortChange} />
                        </div>
                    </div>
                    <AddProduct />
                </div>

                <ProductList products={data?.products || []} isLoading={isLoading} />

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
