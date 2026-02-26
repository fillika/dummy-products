import { useEffect } from "react";
import { useLogoutMutation } from "../../features/auth/api";
import { isTokenExpired } from "../../shared/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [logout] = useLogoutMutation();

    useEffect(() => {
        const checkTokenExpiry = () => {
            if (isTokenExpired()) {
                logout();
            }
        };

        // Check every minute
        const interval = setInterval(checkTokenExpiry, 60000);

        return () => clearInterval(interval);
    }, [logout]);

    return <>{children}</>;
};
