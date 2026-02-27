import { type FC } from "react";
import logo from "../../assets/logo.svg";

export const Logo: FC = () => {
    return (
        <div className="w-full flex items-center justify-center mb-8">
            <div
                className="flex items-center justify-center overflow-hidden w-[52px] h-[52px]"
                style={{
                    background:
                        "linear-gradient(360deg, rgba(35, 35, 35, 0) 50%, rgba(35, 35, 35, 0.06) 100%), #FFFFFF",
                    boxShadow: "0px 0px 0px 2px #FFFFFF, 0px 12px 8px rgba(0, 0, 0, 0.03)",
                    borderRadius: "100px",
                }}
            >
                <img src={logo} alt="Logo" className="w-[35px] h-[35px]" />
            </div>
        </div>
    );
};
