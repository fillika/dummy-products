import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductSelectionState {
    selectAll: boolean;
    excludedIds: number[];
    selectedIds: number[];
}

const initialState: ProductSelectionState = {
    selectAll: false,
    excludedIds: [],
    selectedIds: [],
};

export const productSelectionSlice = createSlice({
    name: "productSelection",
    initialState,
    reducers: {
        selectAllProducts: (state) => {
            state.selectAll = true;
            state.excludedIds = [];
            state.selectedIds = [];
        },
        deselectAllProducts: (state) => {
            state.selectAll = false;
            state.excludedIds = [];
            state.selectedIds = [];
        },
        toggleProductSelection: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
            const { id, checked } = action.payload;
            if (state.selectAll) {
                if (!checked) {
                    if (!state.excludedIds.includes(id)) {
                        state.excludedIds.push(id);
                    }
                } else {
                    state.excludedIds = state.excludedIds.filter((eid) => eid !== id);
                }
            } else {
                if (checked) {
                    if (!state.selectedIds.includes(id)) {
                        state.selectedIds.push(id);
                    }
                } else {
                    state.selectedIds = state.selectedIds.filter((sid) => sid !== id);
                }
            }
        },
        resetProductSelection: (state) => {
            state.selectAll = false;
            state.excludedIds = [];
            state.selectedIds = [];
        },
    },
});

export const {
    selectAllProducts,
    deselectAllProducts,
    toggleProductSelection,
    resetProductSelection,
} = productSelectionSlice.actions;

export const productSelectionReducer = productSelectionSlice.reducer;

export const isProductSelected =
    (id: number) =>
    (state: { productSelection: ProductSelectionState }): boolean => {
        const { selectAll, excludedIds, selectedIds } = state.productSelection;
        if (selectAll) {
            return !excludedIds.includes(id);
        }
        return selectedIds.includes(id);
    };

export const getSelectedProductsInfo = (state: {
    productSelection: ProductSelectionState;
}): { selectAll: boolean; excludedIds: number[]; selectedIds: number[] } => state.productSelection;
