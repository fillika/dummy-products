import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Modal } from "../../shared/ui";
import { toast } from "sonner";

const productSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    price: z.number().positive("Price must be positive"),
    vendor: z.string().min(1, "Vendor is required").min(2, "Vendor must be at least 2 characters"),
    sku: z
        .string()
        .min(1, "SKU is required")
        .regex(/^[A-Z0-9-]+$/i, "SKU must contain only letters, numbers, and hyphens")
        .min(3, "SKU must be at least 3 characters"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProductForm = ({ isOpen, onClose }: ProductFormProps) => {
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

    const onSubmit = async (data: ProductFormData) => {
        // Simulate API call - no actual save as per requirements
        await new Promise((resolve) => setTimeout(resolve, 500));
        toast.success(`Product "${data.name}" added successfully!`);
        reset();
        onClose();
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Add New Product"
            size="md"
            footer={
                <>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                        isLoading={isSubmitting}
                    >
                        Add Product
                    </Button>
                </>
            }
        >
            <form id="product-form" className="space-y-4">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input label="Product Name" error={errors.name?.message} {...field} />
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Price"
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
                        <Input label="Vendor" error={errors.vendor?.message} {...field} />
                    )}
                />
                <Controller
                    name="sku"
                    control={control}
                    render={({ field }) => (
                        <Input label="SKU" error={errors.sku?.message} {...field} />
                    )}
                />
            </form>
        </Modal>
    );
};
