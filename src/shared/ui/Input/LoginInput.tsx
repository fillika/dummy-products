import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib";
import { BaseInput } from "./BaseInput";
import { SvgIcon } from "../svgIcon";
import { UserIcon, CloseIcon } from "../icons";

export interface LoginInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
    (
        { className, label = "Логин", error, helperText, id, value, onChange, ...props },
        ref
    ): React.JSX.Element => {
        const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-") ?? "";
        const hasValue = value !== "" && value !== undefined && value !== null;

        const handleClear = (): void => {
            if (onChange !== undefined) {
                onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
            }
        };

        return (
            <BaseInput label={label} error={error} helperText={helperText} id={inputId}>
                <div className="relative">
                    <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-secondary-400 flex items-center justify-center">
                        <SvgIcon size={24}>
                            <UserIcon />
                        </SvgIcon>
                    </div>
                    <input
                        ref={ref}
                        id={inputId}
                        type="text"
                        className={cn(
                            "input",
                            error !== undefined && "input-error",
                            "pl-[54px]",
                            hasValue && "pr-[54px]",
                            className
                        )}
                        value={value}
                        onChange={onChange}
                        {...props}
                    />
                    {hasValue && (
                        <button
                            type="button"
                            className="absolute right-[16px] top-1/2 -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors flex items-center justify-center cursor-pointer"
                            onClick={handleClear}
                            tabIndex={-1}
                            aria-label="Очистить"
                        >
                            <SvgIcon size={24}>
                                <CloseIcon />
                            </SvgIcon>
                        </button>
                    )}
                </div>
            </BaseInput>
        );
    }
);

LoginInput.displayName = "LoginInput";
