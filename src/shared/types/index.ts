export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: User;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface PaginationParams {
    skip: number;
    limit: number;
}

export interface SortParams {
    sortBy: "price" | "rating" | "title";
    order: "asc" | "desc";
}

export interface SearchParams {
    q: string;
}

export interface AddProductFormData {
    name: string;
    price: number;
    vendor: string;
    sku: string;
}
