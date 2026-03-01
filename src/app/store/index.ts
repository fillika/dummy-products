import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../features/auth/api";
import { productsApi } from "../../entities/product/api";
import { productSelectionReducer } from "../../entities/product/model/selectionSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        productSelection: productSelectionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
