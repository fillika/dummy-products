import { type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/api";
import { Button, LoginInput, PasswordInput, Checkbox } from "../../shared/ui";
import { toast } from "sonner";
import { Logo } from "./Logo";
import styles from "./style.module.css";

const loginSchema = z.object({
    username: z.string().min(1, "Имя пользователя обязательно"),
    password: z.string().min(1, "Пароль обязателен"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
const inputStyles =
    "h-[55px] border-[1.5px] border-[#EDEDED] rounded-[12px] text-[18px] text-[#232323] font-medium";

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "emilys",
            password: "emilyspass",
            rememberMe: false,
        },
        mode: "onChange",
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const formValues = watch();
    const isFormFilled = formValues.username?.trim() && formValues.password?.trim();
    const isSubmitDisabled = !isValid || !isFormFilled || isLoading;

    const onSubmit = async (data: LoginFormData): Promise<void> => {
        try {
            await login({ ...data, rememberMe: data.rememberMe ?? false }).unwrap();
            void toast.success("Вход выполнен успешно!");
            void navigate("/products");
        } catch {
            void toast.error("Неверное имя пользователя или пароль");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
            <div
                className="rounded-[40px] bg-[#fff] p-[6px] w-full max-w-[527px]"
                style={{
                    boxShadow: "0px 24px 32px rgba(0, 0, 0, 0.04)",
                }}
            >
                <div
                    className={"w-full p-[48px] flex-column items-center justify-center rounded-[34px] " + styles.containerBorder}
                    style={{
                        background:
                            "linear-gradient(181deg, rgba(35, 35, 35, 0.03) 0%, rgba(35, 35, 35, 0) 50%)",
                    }}
                >
                    <Logo />
                    <div className="text-center mb-8">
                        <div className="text-[#232323] text-[40px] font-semibold leading-[1.1] tracking-[-1.5%] mb-3">
                            Добро пожаловать!
                        </div>
                        <div className="text-[18px] font-medium leading-[1.5] text-center bg-gradient-to-b from-[#bababa] to-[#E0E0E0] bg-clip-text text-transparent">
                            Пожалуйста, авторизируйтесь
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-[10px] mb-8">
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <LoginInput
                                    error={errors.username?.message}
                                    {...field}
                                    className={inputStyles}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput
                                    error={errors.password?.message}
                                    {...field}
                                    className={inputStyles}
                                />
                            )}
                        />
                        <div className="flex items-center pt-1 mb-5">
                            <Controller
                                name="rememberMe"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        checked={field.value === true}
                                        onChange={field.onChange}
                                        label="Запомнить данные"
                                    />
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitDisabled}
                            className="w-full h-[54px]"
                        >
                            <span className="text-[18px] letter-spacing-[0.01em] leading-[1.2]">
                                Войти
                            </span>
                        </Button>
                        <div className="flex items-center justify-center">
                            <span className="w-full h-[2px] bg-[#ededed]"></span>
                            <span className="mx-[10px] font-medium leading-[1.5] text-[16px] text-[#ebebeb] bg-gradient-to-b from-[#bdbdbd] to-[#ebebeb] bg-clip-text text-transparent">
                                или
                            </span>
                            <span className="w-full h-[2px] bg-[#ededed]"></span>
                        </div>
                    </form>
                    <div className="text-center text-[18px] leading-[1.5]">
                        <span className="text-[#6c6c6c] font-thin">Нет аккаунта?</span>{" "}
                        <a
                            className="text-[#242edb] font-bold underline underline-offset-4 decoration-2"
                            href="#"
                        >
                            Создать
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
