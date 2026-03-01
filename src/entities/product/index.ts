export type { Product } from "../../shared/types";
export {
    productsApi,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
} from "./api";
export {
    selectAllProducts,
    deselectAllProducts,
    toggleProductSelection,
    resetProductSelection,
    isProductSelected,
    getSelectedProductsInfo,
} from "./model";
