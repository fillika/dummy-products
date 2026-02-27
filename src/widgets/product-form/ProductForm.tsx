import { type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Modal } from "../../shared/ui";
import { toast } from "sonner";

const productSchema = z.object({
    name: z.string().min(1, "Наименование обязательно").min(2, "Наименование должно быть не менее 2 символов"),
    price: z.number().positive("Цена должна быть положительной"),
    vendor: z.string().min(1, "Вендор обязателен").min(2, "Вендор должен быть не менее 2 символов"),
    sku: z
        .string()
        .min(1, "Артикул обязателен")
        .regex(/^[A-Z0-9-]+$/i, "Артикул должен содержать только латинские буквы, цифры и дефисы")
        .min(3, "Артикул должен быть не менее 3 символов"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProductForm: FC<ProductFormProps> = ({ isOpen, onClose }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            price: 0,
            vendor: "",
            sku: "",
        },
    });

    const onSubmit = async (data: ProductFormData): Promise<void> => {
        // Simulate API call - no actual save as per requirements
        // todo: implement
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success(`Товар "${data.name}" успешно добавлен!`);
        reset();
        onClose();
    };

    const handleClose = (): void => {
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Добавить новый товар"
            size="md"
            footer={
                <>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    >
                        Добавить товар
                    </Button>
                </>
            }
        >
            <form id="product-form" className="space-y-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input label="Наименование" error={errors.name?.message} {...field} />
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Цена"
                            type="number"
                            step="0.01"
                            error={errors.price?.message}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            value={field.value ?? ""}
                        />
                    )}
                />
                <Controller
                    name="vendor"
                    control={control}
                    render={({ field }) => (
                        <Input label="Вендор" error={errors.vendor?.message} {...field} />
                    )}
                />
                <Controller
                    name="sku"
                    control={control}
                    render={({ field }) => (
                        <Input label="Артикул" error={errors.sku?.message} {...field} />
                    )}
                />
            </form>
        </Modal>
    );
};
