import { type FC, type ReactNode, useEffect } from "react";
import { useLogoutMutation } from "../../features/auth/api";
import { isTokenExpired } from "../../shared/api";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [logout] = useLogoutMutation();

    useEffect(() => {
        const checkTokenExpiry = (): void => {
            if (isTokenExpired()) {
                void logout();
            }
        };

        // Check every minute
        const interval = setInterval(checkTokenExpiry, 60000);

        return (): void => {
            clearInterval(interval);
        };
    }, [logout]);

    return <>{children}</>;
};
