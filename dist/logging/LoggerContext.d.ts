import { type ReactNode, type FC } from "react";
import type { LoggerContextType, LoggerConfig } from "./types";
interface LoggerProviderProps {
    children: ReactNode;
    config?: LoggerConfig;
}
export declare const LoggerProvider: FC<LoggerProviderProps>;
export declare const useLogger: () => LoggerContextType;
export {};
