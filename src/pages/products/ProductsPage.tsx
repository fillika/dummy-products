import { type FC, useState, useMemo } from "react";
import { Header } from "../../widgets/header";
import { ProductList } from "../../widgets/product-list";
import { Pagination } from "../../widgets/pagination";
import { AddProduct } from "../../features/add-product/ui";
import { useGetProductsQuery } from "../../entities/product";
import type { SortParams } from "../../shared/types";
import { RefreshButton } from "../../features/refresh-products/ui/RefreshButton";
import type { SortValue } from "../../shared/constants";

export const ProductsPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortValue, setSortValue] = useState<SortValue>("price-asc");
    const [isRefreshing, setRefreshing] = useState(false);

    const itemsPerPage = 5;

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

    const handleSortChange = (value: string): void => {
        setSortValue(value as SortValue);
        setCurrentPage(1);
    };

    const handleSearch = (query: string): void => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        handleSortChange("price-asc");
        setTimeout(() => {
            setRefreshing(false);
        }, 700);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
            <Header onSearch={handleSearch} />
            <main className="w-full bg-[#fff] flex-1 flex flex-col">
                <div className="px-2 lg:px-[30px] py-8 flex-1 flex flex-col">
                    <div className="flex justify-between gap-4 items-center mb-10">
                        <span className="font-bold text-[22px] text-[#333] leading-[1] font-cairo">Все позиции</span>
                        <div className="flex gap-2">
                            <RefreshButton handleRefresh={handleRefresh} disabled={isRefreshing} />
                            <AddProduct />
                        </div>
                    </div>

                    <div className="overflow-auto mb-6 pl-[10px]">
                        <ProductList
                            products={data?.products || []}
                            isLoading={isLoading || isRefreshing}
                            sortValue={sortValue}
                            onSortChange={handleSortChange}
                        />
                    </div>

                    {data && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={data.total}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};
