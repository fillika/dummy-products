import { type FC } from "react";
import { ProductList } from "../../widgets/product-list";
import type { Product } from "../../shared/types";
import type { SortValue } from "../../shared/constants";
import { useProductSelection } from "./hooks/useProductSelection";
import { useAppSelector, useAppDispatch } from "../../app/providers";
import { getSelectedProductsInfo, resetProductSelection } from "../../entities/product";

interface ProductTableProps {
    products: Product[];
    isLoading?: boolean;
    sortValue: SortValue;
    onSortChange: (value: SortValue) => void;
    totalItems?: number;
}

export const ProductTable: FC<ProductTableProps> = ({
    products,
    isLoading,
    sortValue,
    onSortChange,
    totalItems,
}) => {
    const dispatch = useAppDispatch();
    const { selectAll, excludedIds, selectedIds } = useAppSelector(getSelectedProductsInfo);
    const { handleSelectionChange } = useProductSelection();

    const handleSortChangeWithReset = (value: SortValue): void => {
        onSortChange(value);
        dispatch(resetProductSelection());
    };

    return (
        <ProductList
            products={products}
            isLoading={isLoading}
            sortValue={sortValue}
            onSortChange={handleSortChangeWithReset}
            totalItems={totalItems}
            selectedIds={selectedIds}
            selectAll={selectAll}
            excludedIds={excludedIds}
            onSelectionChange={handleSelectionChange}
        />
    );
};
