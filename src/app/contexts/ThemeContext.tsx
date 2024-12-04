import React, { createContext } from "react";
import { ThemeContextInterface } from "../../types/theme"

export const ThemeContext = createContext<ThemeContextInterface | null>(null);
