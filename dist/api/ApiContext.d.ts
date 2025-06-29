import { type ReactNode, type FC } from "react";
import type { ApiContextType, ApiConfig } from "./types";
interface ApiProviderProps {
    children: ReactNode;
    config: ApiConfig;
}
export declare const ApiProvider: FC<ApiProviderProps>;
export declare const useApi: () => ApiContextType;
export {};
