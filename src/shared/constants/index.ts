export const API_BASE_URL = "https://dummyjson.com";

export const TOKEN_KEY = "auth_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const TOKEN_EXPIRY_KEY = "token_expiry";

export const DEFAULT_PAGINATION = {
    skip: 0,
    limit: 10,
};

export const SORT_OPTIONS = [
    { value: "price-asc", label: "Цена: по возрастанию" },
    { value: "price-desc", label: "Цена: по убыванию" },
    { value: "rating-asc", label: "Рейтинг: по возрастанию" },
    { value: "rating-desc", label: "Рейтинг: по убыванию" },
    { value: "title-asc", label: "Название: А-Я" },
    { value: "title-desc", label: "Название: Я-А" },
];

export const LOW_RATING_THRESHOLD = 3;
