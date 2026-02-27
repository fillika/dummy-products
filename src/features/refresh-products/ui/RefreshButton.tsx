import { type FC } from "react";
import { Button } from "../../../shared/ui";
import { RefreshIcon, SvgIcon } from "../../../shared/ui/icons";

export const RefreshButton: FC = () => {
    return (
        <Button variant="ghost" className="h-[42px] w-[42px] p-0">
            <SvgIcon size={22}>
                <RefreshIcon />
            </SvgIcon>
        </Button>
    )
}