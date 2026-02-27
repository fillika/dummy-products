import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api";
import type {
    ProductsResponse,
    Product,
    PaginationParams,
    SortParams,
    SearchParams,
} from "../../../shared/types";

type ProductsQueryParams = PaginationParams & Partial<SortParams & SearchParams>;

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery,
    tagTypes: ["Product"],
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, ProductsQueryParams>({
            query: (params) => {
                const { skip, limit, sortBy, order, q } = params;
                const searchParams = new URLSearchParams({
                    skip: skip.toString(),
                    limit: limit.toString(),
                });

                if (sortBy !== undefined && order !== undefined) {
                    searchParams.append("sortBy", sortBy);
                    searchParams.append("order", order);
                }

                if (q !== undefined && q !== "") {
                    searchParams.append("q", q);
                }

                return `/products/search?${searchParams.toString()}`;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.products.map(({ id }) => ({ type: "Product" as const, id })),
                          { type: "Product", id: "LIST" },
                      ]
                    : [{ type: "Product", id: "LIST" }],
        }),
        getProductById: build.query<Product, number>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Product", id }],
        }),
        addProduct: build.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: "/products/add",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Product", id: "LIST" }],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation } = productsApi;
