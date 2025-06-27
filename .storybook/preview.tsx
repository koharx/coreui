import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { AlertProvider } from "../src/contexts/AlertContext";
import "react-toastify/dist/ReactToastify.css";

// Create a simplified AlertProvider for Storybook
const StorybookAlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AlertProvider>{children}</AlertProvider>;
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <StorybookAlertProvider>
          <Story />
        </StorybookAlertProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
