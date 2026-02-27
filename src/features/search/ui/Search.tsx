import { Input } from "../../../shared/ui/Input";
import { debounce } from "../../../shared/lib";
import { type FC, useCallback, useState } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export const Search: FC<SearchProps> = ({ onSearch, placeholder = "Search products..." }) => {
    const [value, setValue] = useState("");

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
        <div className="w-full max-w-md">
            <Input value={value} onChange={handleChange} placeholder={placeholder} type="search" />
        </div>
    );
};
