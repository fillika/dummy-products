import { useAppDispatch } from "../../../app/providers";
import {
    selectAllProducts,
    deselectAllProducts,
    toggleProductSelection,
} from "../../../entities/product";

export const useProductSelection = () => {
    const dispatch = useAppDispatch();

    const handleSelectionChange = (params: {
        selectAll?: boolean;
        excludedIds?: number[];
        selectedIds?: number[];
    }): void => {
        const { selectAll, excludedIds, selectedIds } = params;

        if (selectAll !== undefined) {
            dispatch(selectAll ? selectAllProducts() : deselectAllProducts());
            return;
        }

        if (excludedIds !== undefined) {
            const lastExcludedId = excludedIds[excludedIds.length - 1];
            if (lastExcludedId !== undefined) {
                dispatch(toggleProductSelection({ id: lastExcludedId, checked: false }));
            }
            return;
        }

        if (selectedIds !== undefined) {
            const lastSelectedId = selectedIds[selectedIds.length - 1];
            if (lastSelectedId !== undefined) {
                dispatch(toggleProductSelection({ id: lastSelectedId, checked: true }));
            }
            return;
        }
    };

    return { handleSelectionChange };
};
