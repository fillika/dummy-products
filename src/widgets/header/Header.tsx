import { type FC } from "react";
import { SearchInput } from "../../shared/ui/Input";

interface HeaderProps {
    onSearch?: (query: string) => void;
}

export const Header: FC<HeaderProps> = ({ onSearch }) => {
    return (
        <header className="bg-[#fff] mb-[30px] h-25 px-2 lg:px-[30px]">
            <div className="w-full h-full">
                <div className="flex items-center justify-between gap-5 2xl:justify-start 2xl:gap-[313px] h-full">
                    <div className="font-bold text-[#202020] text-[26px] leading-[45px] font-cairo">Товары</div>
                    {onSearch && <SearchInput onSearch={onSearch} />}
                </div>
            </div>
        </header>
    );
};
