import { createBrowserRouter, Navigate } from "react-router-dom";
import { getToken } from "../../shared/api";

const isAuthenticated = (): boolean => {
    return !!getToken();
};

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export const router = createBrowserRouter([
    {
        path: "/login",
        lazy: async () => {
            const { LoginPage } = await import("../../pages/login");
            return { Component: () => <LoginPage /> };
        },
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Navigate to="/products" replace />
            </ProtectedRoute>
        ),
    },
    {
        path: "/products",
        lazy: async () => {
            const { ProductsPage } = await import("../../pages/products");
            return { Component: () => <ProductsPage /> };
        },
    },
]);

export { ProtectedRoute };
