import { type FC, type ReactNode } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { getToken } from "../../shared/api";

const isAuthenticated = (): boolean => {
    const token = getToken();
    return token !== null && token !== "";
};

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const createRouter = (): ReturnType<typeof createBrowserRouter> => {
    return createBrowserRouter([
        {
            path: "/login",
            lazy: async (): Promise<{
                Component: () => React.JSX.Element;
            }> => {
                const { LoginPage } = await import("../../pages/login");
                return { Component: (): React.JSX.Element => <LoginPage /> };
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
            lazy: async (): Promise<{
                Component: () => React.JSX.Element;
            }> => {
                const { ProductsPage } = await import("../../pages/products");
                return { Component: (): React.JSX.Element => <ProductsPage /> };
            },
        },
    ]);
};

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter();

export { ProtectedRoute };
