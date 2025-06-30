import { type FC } from "react";
interface AlertContainerProps {
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    className?: string;
}
export declare const AlertContainer: FC<AlertContainerProps>;
export {};
