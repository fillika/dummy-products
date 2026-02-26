import { Select } from "../../../shared/ui/Select";
import { SORT_OPTIONS } from "../../../shared/constants";

interface SortProps {
    value: string;
    onChange: (value: string) => void;
}

export const Sort = ({ value, onChange }: SortProps) => {
    return (
        <Select
            label="Sort by"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            options={SORT_OPTIONS}
        />
    );
};
