import { type FC, type ReactNode, useEffect } from "react";
import { cn } from "../../lib";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md",
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent): void => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return (): void => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeStyles = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={cn("modal-content", sizeStyles[size])}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title !== undefined ? "modal-title" : undefined}
            >
                {title !== undefined && (
                    <div className="flex items-center justify-between mb-4">
                        <h2 id="modal-title" className="text-xl font-semibold text-secondary-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-secondary-400 hover:text-secondary-600 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                <div className="mb-4">{children}</div>
                {footer !== undefined && (
                    <div className="flex justify-end gap-2 pt-4 border-t">{footer}</div>
                )}
            </div>
        </div>
    );
};
