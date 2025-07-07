// Story: Zustand Theme Toggler Demo
// Demonstrates a simple dark/light mode store using Zustand
import React from "react";
import { create } from "zustand";

// Zustand store for theme
type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  reset: () => void;
};

const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
  reset: () => set({ theme: "light" }),
}));

const ThemeToggler = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const reset = useThemeStore((s) => s.reset);
  return (
    <div
      style={{
        background: theme === "dark" ? "#222" : "#fff",
        color: theme === "dark" ? "#fff" : "#222",
        padding: 24,
        borderRadius: 8,
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <button
        aria-label="Toggle theme"
        onClick={toggleTheme}
        style={{ marginRight: 12 }}
      >
        Toggle Theme
      </button>
      <button aria-label="Reset theme" onClick={reset}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        Current theme: <b>{theme}</b>
      </div>
      <pre
        style={{
          marginTop: 16,
          background: "#eee",
          padding: 8,
          borderRadius: 4,
        }}
      >
        {JSON.stringify({ theme }, null, 2)}
      </pre>
    </div>
  );
};

export default {
  title: "State/Theme/ThemeToggler",
  component: ThemeToggler,
  parameters: {
    docs: {
      description: {
        component: `A simple Zustand store for toggling dark/light theme.

**Usage tips:**
- Try toggling and resetting the theme.
- The current theme is shown as JSON for debugging.
- See the [README](../../../../README.md#common-zustand-recipes) for more patterns.`,
      },
    },
    a11y: {
      // Ensures buttons are accessible
      config: {
        rules: [{ id: "button-name", enabled: true }],
      },
    },
  },
};

export const Default = () => <ThemeToggler />;
