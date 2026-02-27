import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, TOKEN_KEY, REFRESH_TOKEN_KEY, TOKEN_EXPIRY_KEY } from "../constants";

export const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        const localToken = localStorage.getItem(TOKEN_KEY);
        const sessionToken = sessionStorage.getItem(TOKEN_KEY);
        const token = localToken ?? sessionToken;
        if (token !== null) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const isTokenExpired = (): boolean => {
    const localExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    const sessionExpiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    const expiry = localExpiry ?? sessionExpiry;
    if (expiry === null) return true;
    return Date.now() >= parseInt(expiry, 10);
};

export const setToken = (token: string, refreshToken: string, rememberMe: boolean): void => {
    const storage = rememberMe ? localStorage : sessionStorage;
    const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour

    storage.setItem(TOKEN_KEY, token);
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    storage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

export const clearToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const getToken = (): string | null => {
    const localToken = localStorage.getItem(TOKEN_KEY);
    const sessionToken = sessionStorage.getItem(TOKEN_KEY);
    return localToken ?? sessionToken;
};
