import { type FC, useState } from "react";
import { Table } from "../../shared/ui/Table";
import type { Product } from "../../shared/types";
import type { SortValue } from "../../shared/constants";
import { useProductColumns } from "./useProductColumns";

interface ProductListProps {
    products: Product[];
    isLoading?: boolean;
    sortValue?: SortValue;
    onSortChange?: (value: SortValue) => void;
    totalItems?: number;
    selectedIds?: number[];
    selectAll?: boolean;
    excludedIds?: number[];
    onSelectionChange?: (params: { selectedIds?: number[]; selectAll?: boolean; excludedIds?: number[] }) => void;
}

export const ProductList: FC<ProductListProps> = ({
    products,
    isLoading,
    sortValue = "price-asc",
    onSortChange,
    selectedIds = [],
    selectAll = false,
    excludedIds = [],
    onSelectionChange,
}) => {
    const [localSelectedIds, setLocalSelectedIds] = useState<number[]>([]);
    const [localSelectAll, setLocalSelectAll] = useState(false);
    const [localExcludedIds, setLocalExcludedIds] = useState<number[]>([]);

    const isControlled = onSelectionChange !== undefined;
    const currentSelectAll = isControlled ? selectAll : localSelectAll;
    const currentSelectedIds = isControlled ? selectedIds : localSelectedIds;
    const currentExcludedIds = isControlled ? excludedIds : localExcludedIds;
    const setCurrentSelection = isControlled
        ? onSelectionChange
        : (params: { selectedIds?: number[]; selectAll?: boolean; excludedIds?: number[] }) => {
            if (params.selectedIds !== undefined) setLocalSelectedIds(params.selectedIds);
            if (params.selectAll !== undefined) setLocalSelectAll(params.selectAll);
            if (params.excludedIds !== undefined) setLocalExcludedIds(params.excludedIds);
        };

    const columns = useProductColumns({
        sortValue,
        onSortChange,
        currentSelectAll,
        currentSelectedIds,
        currentExcludedIds,
        setCurrentSelection,
    });

    return (
        <Table
            columns={columns}
            data={products}
            isLoading={isLoading}
            emptyMessage="Товары не найдены"
            selectedIds={currentSelectAll ? products.filter((p) => !currentExcludedIds.includes(p.id)).map((p) => p.id) : currentSelectedIds}
        />
    );
};
