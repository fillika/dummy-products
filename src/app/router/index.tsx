import { useEffect, useState, type FC, type ReactNode, type ComponentType } from "react";
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

interface GuestRouteProps {
    children: ReactNode;
}

const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/products" replace />;
    }
    return <>{children}</>;
};

const LoginPageLazy: FC = () => {
    const [LoginPage, setPage] = useState<ComponentType | null>(null);

    useEffect(() => {
        import("../../pages/login").then(({ LoginPage }) => {
            setPage(() => LoginPage);
        });
    }, []);

    if (!LoginPage) return null;
    return <LoginPage />;
};

const ProductsPageLazy: FC = () => {
    const [ProductsPage, setPage] = useState<ComponentType | null>(null);

    useEffect(() => {
        import("../../pages/products").then(({ ProductsPage }) => {
            setPage(() => ProductsPage);
        });
    }, []);

    if (!ProductsPage) return null;
    return <ProductsPage />;
};

const createRouter = (): ReturnType<typeof createBrowserRouter> => {
    return createBrowserRouter([
        {
            path: "/login",
            element: (
                <GuestRoute>
                    <LoginPageLazy />
                </GuestRoute>
            ),
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
            element: (
                <ProtectedRoute>
                    <ProductsPageLazy />
                </ProtectedRoute>
            ),
        },
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ]);
};

// eslint-disable-next-line react-refresh/only-export-components
export const router = createRouter();

export { ProtectedRoute };
