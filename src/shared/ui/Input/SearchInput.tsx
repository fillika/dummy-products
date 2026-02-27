import type { FC } from "react";
import { useState, useCallback } from "react";
import { SearchIcon } from "../icons";
import { debounce } from "../../lib";

export interface SearchInputProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    defaultValue?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
    onSearch,
    placeholder = "Найти",
    defaultValue = "",
}) => {
    const [value, setValue] = useState(defaultValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onSearch(query);
        }, 500),
        [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    };

    return (
        <div className="relative w-full max-w-[1024px] h-[48px] bg-[#F3F3F3] rounded-[8px]">
            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 text-secondary-500">
                <SearchIcon />
            </div>
            <input
                name="search input"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full h-full bg-transparent text-[18px] text-[#232323] font-medium placeholder:text-[#999] focus:outline-none pl-13 pr-4"
            />
        </div>
    );
};
