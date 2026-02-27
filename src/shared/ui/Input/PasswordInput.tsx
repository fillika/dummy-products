import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib";
import { BaseInput } from "./BaseInput";
import { SvgIcon } from "../svgIcon";
import { LockIcon, EyeIcon } from "../icons";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, label = "Пароль", error, helperText, id, ...props }, ref) => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "";
        const [showPassword, setShowPassword] = useState(false);

        return (
            <BaseInput label={label} error={error} helperText={helperText} id={inputId}>
                <div className="relative">
                    <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-secondary-400 flex items-center justify-center">
                        <SvgIcon size={24}>
                            <LockIcon />
                        </SvgIcon>
                    </div>
                    <input
                        ref={ref}
                        id={inputId}
                        type={showPassword ? "text" : "password"}
                        className={cn(
                            "input",
                            error !== undefined && "input-error",
                            "pl-[54px] pr-[54px]",
                            className
                        )}
                        {...props}
                    />
                    <button
                        type="button"
                        className="absolute right-[16px] top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors flex items-center justify-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    >
                        <SvgIcon size={24}>
                            <EyeIcon isOpen={showPassword} />
                        </SvgIcon>
                    </button>
                </div>
            </BaseInput>
        );
    }
);

PasswordInput.displayName = "PasswordInput";
