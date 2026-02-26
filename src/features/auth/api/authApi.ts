import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/api";
import type { AuthResponse, LoginCredentials } from "../../../shared/types";
import { setToken, clearToken } from "../../../shared/api";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, LoginCredentials & { rememberMe: boolean }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: {
                    username: credentials.username,
                    password: credentials.password,
                    expiresInMins: 60,
                },
            }),
            async onQueryStarted({ rememberMe }, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token, data.refreshToken, rememberMe);
                } catch {
                    // Error handling is done by the component
                }
            },
        }),
        logout: build.mutation<void, void>({
            queryFn: () => {
                clearToken();
                return { data: undefined };
            },
        }),
        me: build.query<AuthResponse, void>({
            query: () => "/auth/me",
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
