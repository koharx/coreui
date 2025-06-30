import { type ReactNode, type FC } from "react";
import type { AuthContextType } from "./types";
interface AuthProviderProps {
    children: ReactNode;
    apiClient?: any;
}
export declare const AuthProvider: FC<AuthProviderProps>;
export declare const useAuth: () => AuthContextType;
export {};
