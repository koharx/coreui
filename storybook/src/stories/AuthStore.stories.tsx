// Story: Zustand Authentication Store Demo
// Demonstrates a simple auth store with login/logout using Zustand
import React from "react";
import { create } from "zustand";

type User = { id: string; name: string };
type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  reset: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  reset: () => set({ user: null }),
}));

const AuthDemo = () => {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const reset = useAuthStore((s) => s.reset);
  return (
    <div style={{ padding: 24, borderRadius: 8, background: "#f8f8f8" }}>
      {user ? (
        <>
          <div>
            Welcome, <b>{user.name}</b>!
          </div>
          <button
            aria-label="Logout"
            onClick={logout}
            style={{ marginTop: 12, marginRight: 8 }}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          aria-label="Login as Alice"
          onClick={() => login({ id: "1", name: "Alice" })}
          style={{ marginRight: 8 }}
        >
          Login as Alice
        </button>
      )}
      <button aria-label="Reset user" onClick={reset}>
        Reset
      </button>
      <pre
        style={{
          marginTop: 16,
          background: "#eee",
          padding: 8,
          borderRadius: 4,
        }}
      >
        {JSON.stringify({ user }, null, 2)}
      </pre>
    </div>
  );
};

export default {
  title: "State/Auth/AuthStore",
  component: AuthDemo,
  parameters: {
    docs: {
      description: {
        component: `A simple Zustand store for authentication (login/logout).

**Usage tips:**
- Try logging in, logging out, and resetting the user.
- The current user state is shown as JSON for debugging.
- See the [README](../../../../README.md#common-zustand-recipes) for more patterns.`,
      },
    },
    a11y: {
      config: {
        rules: [{ id: "button-name", enabled: true }],
      },
    },
  },
};

export const Default = () => <AuthDemo />;
