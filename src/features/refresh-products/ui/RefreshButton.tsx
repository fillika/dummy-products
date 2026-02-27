import { type FC } from "react";
import { Button } from "../../../shared/ui";
import { RefreshIcon, SvgIcon } from "../../../shared/ui/icons";

type Props = {
    disabled?: boolean;
    handleRefresh?: () => void;
}

export const RefreshButton: FC<Props> = ({ disabled, handleRefresh }) => {
    return (
        <Button variant="ghost" className="h-[42px] w-[42px] p-0" onClick={handleRefresh} disabled={!!disabled}>
            <SvgIcon size={22}>
                <RefreshIcon />
            </SvgIcon>
        </Button>
    )
}