import { type FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AuthProvider } from "./app/providers";
import { Toaster } from "sonner";

const App: FC = () => {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            <Toaster position="top-right" richColors />
        </>
    );
};

export default App;
