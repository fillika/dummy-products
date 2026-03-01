import { type FC, useState } from "react";
import { Table } from "../../shared/ui/Table";
import type { Product } from "../../shared/types";
import type { SortValue } from "../../shared/constants";
import type { SelectionChangeParams } from "./types";
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
    onSelectionChange?: (params: SelectionChangeParams) => void;
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
        : (params: SelectionChangeParams) => {
            if (params.type === 'select_all') {
                setLocalSelectAll(true);
                setLocalExcludedIds([]);
                setLocalSelectedIds([]);
            } else if (params.type === 'deselect_all') {
                setLocalSelectAll(false);
                setLocalExcludedIds([]);
                setLocalSelectedIds([]);
            } else if (params.type === 'toggle' && params.id !== undefined) {
                const { id, checked } = params;
                if (localSelectAll) {
                    if (!checked) {
                        setLocalExcludedIds([...localExcludedIds, id]);
                    } else {
                        setLocalExcludedIds(localExcludedIds.filter((eid) => eid !== id));
                    }
                } else {
                    if (checked) {
                        setLocalSelectedIds([...localSelectedIds, id]);
                    } else {
                        setLocalSelectedIds(localSelectedIds.filter((sid) => sid !== id));
                    }
                }
            }
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
