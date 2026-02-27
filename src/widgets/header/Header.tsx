import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/api";

export const Header: FC = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const handleLogout = async (): Promise<void> => {
        await logout();
        void navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-primary-600">Товары</h1>
                    <button onClick={handleLogout} className="btn btn-secondary">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};
