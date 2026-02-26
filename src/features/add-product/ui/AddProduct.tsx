import { useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { ProductForm } from "../../../widgets/product-form";

export const AddProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                + Add Product
            </Button>
            <ProductForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
