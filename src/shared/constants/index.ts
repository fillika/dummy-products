export const API_BASE_URL = "https://dummyjson.com";

export const TOKEN_KEY = "auth_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const TOKEN_EXPIRY_KEY = "token_expiry";

export const DEFAULT_PAGINATION = {
    skip: 0,
    limit: 10,
};

export const SORT_OPTIONS = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "title-asc", label: "Title: A to Z" },
    { value: "title-desc", label: "Title: Z to A" },
];

export const LOW_RATING_THRESHOLD = 3;
