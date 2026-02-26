import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/api";
import { Button, Input } from "../../shared/ui";
import { toast } from "sonner";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login({ ...data, rememberMe: data.rememberMe ?? false }).unwrap();
            toast.success("Login successful!");
            navigate("/products");
        } catch (error) {
            toast.error("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-50">
            <div className="card w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-secondary-900 mb-6">Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input label="Username" error={errors.username?.message} {...field} />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Password"
                                type="password"
                                error={errors.password?.message}
                                {...field}
                            />
                        )}
                    />
                    <div className="flex items-center">
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => (
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                                        checked={field.value}
                                        onChange={field.onChange}
                                    />
                                    <span className="ml-2 text-sm text-secondary-600">
                                        Remember me
                                    </span>
                                </label>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm text-secondary-500">
                    <p>Demo credentials:</p>
                    <p className="font-mono">emilys / emilyspass</p>
                </div>
            </div>
        </div>
    );
};
