import { useAppDispatch } from "../../../app/providers";
import type { SelectionChangeParams } from "../../../widgets/product-list/types";
import {
    selectAllProducts,
    deselectAllProducts,
    toggleProductSelection,
} from "../../../entities/product";

export const useProductSelection = () => {
    const dispatch = useAppDispatch();

    const handleSelectionChange = (params: SelectionChangeParams): void => {
        const { type, id, checked } = params;

        if (type === 'select_all') {
            dispatch(selectAllProducts());
        } else if (type === 'deselect_all') {
            dispatch(deselectAllProducts());
        } else if (type === 'toggle' && id !== undefined && checked !== undefined) {
            dispatch(toggleProductSelection({ id, checked }));
        }
    };

    return { handleSelectionChange };
};
