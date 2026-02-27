import { type FC, useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { ProductForm } from "../../../widgets/product-form";
import { SvgIcon } from "../../../shared/ui";
import { RoundedPlusIcon } from "../../../shared/ui/icons";

export const AddProduct: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button className="px-5 max-h-[42px] !rounded-[6px]" onClick={() => setIsModalOpen(true)}>
                <SvgIcon size={22} className="mr-[15px]">
                    <RoundedPlusIcon />
                </SvgIcon>
                <span className="text-[14px] leading-[26px] font-semibold font-cairo">Добавить</span>
            </Button>
            <ProductForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
