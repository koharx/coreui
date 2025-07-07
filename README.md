# @koharx/core-ui

A comprehensive React library providing authentication, API calling, logging, and alert functionality with TypeScript support.

## Features

- 🔐 **Authentication**: JWT-based authentication with role and permission management
- 🌐 **API Client**: Axios-based HTTP client with interceptors and error handling
- 📝 **Logging**: Configurable logging system with console and localStorage support
- 🚨 **Alerts**: Toast notifications with multiple types and positioning
- 🎣 **Utility Hooks**: LocalStorage, SessionStorage, Debounce, and Throttle hooks
- 📦 **TypeScript**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @koharx/core-ui
```

## Quick Start

```tsx
import React from "react";
import {
  AuthProvider,
  ApiProvider,
  LoggerProvider,
  AlertProvider,
  AlertContainer,
  useAuth,
  useApi,
  useLogger,
  useAlert,
} from "@koharx/core-ui";

function App() {
  return (
    <LoggerProvider config={{ level: "info", enableConsole: true }}>
      <AlertProvider maxAlerts={5} defaultDuration={5000}>
        <ApiProvider config={{ baseURL: "https://api.example.com" }}>
          <AuthProvider>
            <MyApp />
            <AlertContainer position="top-right" />
          </AuthProvider>
        </ApiProvider>
      </AlertProvider>
    </LoggerProvider>
  );
}

function MyApp() {
  const { login, user, isAuthenticated } = useAuth();
  const { get, post } = useApi();
  const { info, error } = useLogger();
  const { showSuccess, showError } = useAlert();

  const handleLogin = async () => {
    try {
      await login({ email: "user@example.com", password: "password" });
      info("User logged in successfully");
      showSuccess("Login Successful", "Welcome back!");
    } catch (err) {
      error("Login failed", err as Error);
      showError("Login Failed", "Invalid credentials");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Alert System

### AlertProvider

Provides alert context for displaying toast notifications.

```tsx
import { AlertProvider } from "@koharx/core-ui";

<AlertProvider maxAlerts={5} defaultDuration={5000}>
  <YourApp />
</AlertProvider>;
```

### useAlert Hook

```tsx
import { useAlert } from "@koharx/core-ui";

function MyComponent() {
  const {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissAlert,
    clearAlerts,
  } = useAlert();

  const handleSuccess = () => {
    showSuccess("Success!", "Operation completed successfully");
  };

  const handleError = () => {
    showError("Error!", "Something went wrong");
  };

  const handleWarning = () => {
    showWarning("Warning!", "Please check your input");
  };

  const handleInfo = () => {
    showInfo("Info", "Here is some information");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleWarning}>Show Warning</button>
      <button onClick={handleInfo}>Show Info</button>
      <button onClick={clearAlerts}>Clear All</button>
    </div>
  );
}
```

### AlertContainer

Displays the alerts in the UI. You can position it anywhere in your app.

```tsx
import { AlertContainer } from "@koharx/core-ui";

// Position options: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
<AlertContainer position="top-right" />;
```

### Alert Types

- **Success**: Green alerts for successful operations
- **Error**: Red alerts for errors and failures
- **Warning**: Yellow alerts for warnings
- **Info**: Blue alerts for informational messages

### Alert Options

```tsx
showSuccess("Title", "Message", {
  duration: 3000, // Auto-dismiss after 3 seconds (0 = no auto-dismiss)
  dismissible: true, // Whether the alert can be manually dismissed
});
```

## CI/CD & Versioning

This project uses GitHub Actions for automated CI/CD, versioning, and publishing. For detailed setup instructions, see [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md).

### Automated Workflows

- **CI**: Runs tests, linting, and builds on every push/PR
- **Release**: Automatically versions and releases based on conventional commits
- **Publish**: Publishes to npm and creates GitHub releases

### Manual Version Commands

```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new features)
npm run release:minor

# Major release (breaking changes)
npm run release:major

# Beta release (for testing)
npm run release:beta
```

### Conventional Commits

Use these commit formats for automatic versioning:

```bash
git commit -m "feat: add new component"     # Minor version
git commit -m "fix: resolve bug"            # Patch version
git commit -m "feat!: breaking change"      # Major version
```

## License

MIT

## State Management (with Zustand)

This library now recommends [Zustand](https://github.com/pmndrs/zustand) for state management. Zustand is a fast, scalable, and easy-to-use state management solution for React.

### Basic Usage

```ts
import { create } from "zustand";

type AppState = {
  count: number;
  inc: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Using in Components

```tsx
import { useAppStore } from "./state/appStore";

const Counter = () => {
  const count = useAppStore((s) => s.count);
  const inc = useAppStore((s) => s.inc);
  return <button onClick={inc}>Count: {count}</button>;
};
```

### DevTools Middleware

Enable Redux DevTools integration for time-travel debugging:

```ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useDevtoolsStore = create<{ count: number; inc: () => void }>()(
  devtools(
    (set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "DevtoolsStore" }
  )
);
```

### Immer Middleware

Enable immutable state updates using Immer:

```ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TodoState = { todos: string[]; addTodo: (todo: string) => void };

const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    addTodo: (todo) =>
      set((state) => {
        state.todos.push(todo);
      }),
  }))
);
```

### Scoped/Context Stores

You can scope a store to a subtree using React context:

```tsx
import React, { createContext, useContext } from "react";
import { create } from "zustand";

const useCounterStore = () =>
  create<{ count: number; inc: () => void }>((set) => ({
    count: 0,
    inc: () => set((s) => ({ count: s.count + 1 })),
  }));

const CounterContext = createContext<ReturnType<typeof useCounterStore> | null>(
  null
);

export const CounterProvider: React.FC = ({ children }) => {
  const store = useCounterStore();
  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

export const useCounter = () => {
  const store = useContext(CounterContext);
  if (!store) throw new Error("useCounter must be used within CounterProvider");
  return store;
};
```

---

> **Note:** The previous custom state management utilities (`createStore`, custom middleware) have been removed in favor of Zustand. All new development and examples use Zustand as the recommended solution.

## Using Zustand to Create Dynamic Stores

This library exports Zustand's `create` function so you can define your own dynamic stores in your callee project.

### Example Usage

```tsx
import { create } from "coreui";

// Define your own store shape and actions
interface MyState {
  value: number;
  setValue: (v: number) => void;
}

export const useMyStore = create<MyState>((set) => ({
  value: 0,
  setValue: (v) => set({ value: v }),
}));

// Use your store in a component
const MyComponent = () => {
  const value = useMyStore((s) => s.value);
  const setValue = useMyStore((s) => s.setValue);
  return (
    <div>
      <button onClick={() => setValue(value + 1)}>Value: {value}</button>
    </div>
  );
};
```

- You have full control over the store's state and actions.
- You can use Zustand middleware, selectors, and advanced patterns as needed.

---

## Advanced Zustand Usage Examples

### 1. Using Middleware (Devtools, Persist, Immer)

```ts
import { create } from "coreui";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type MyState = {
  value: number;
  setValue: (v: number) => void;
  reset: () => void;
};

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      immer((set) => ({
        value: 0,
        setValue: (v) =>
          set((state) => {
            state.value = v;
          }),
        reset: () => set({ value: 0 }),
      })),
      { name: "my-store" }
    ),
    { name: "MyStoreDevtools" }
  )
);
```

---

### 2. Selectors and Shallow Compare

```ts
import { create } from "coreui";
import { shallow } from "zustand/shallow";

type State = { a: number; b: number };
export const useStore = create<State>(() => ({ a: 1, b: 2 }));

// In a component:
const [a, b] = useStore((s) => [s.a, s.b], shallow);
```

---

### 3. Async Actions

```ts
import { create } from "coreui";

type State = {
  data: string | null;
  fetchData: () => Promise<void>;
};

export const useAsyncStore = create<State>((set) => ({
  data: null,
  fetchData: async () => {
    const response = await fetch("/api/data");
    const data = await response.text();
    set({ data });
  },
}));
```

---

### 4. Resetting State

```ts
import { create } from "coreui";

type State = {
  value: number;
  reset: () => void;
};

const initialState = { value: 0 };

export const useResetStore = create<State>((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
```

---

For more advanced patterns and best practices, see the [Zustand documentation](https://docs.pmnd.rs/zustand/getting-started/introduction).

## Troubleshooting & FAQ

### Troubleshooting

- **Q: I get "TypeError: create is not a function"**

  - **A:** Make sure you are importing `create` from your library or from `zustand` directly, and that your build is up to date.

- **Q: My store state resets on every render**

  - **A:** Always define your store at the module level, not inside a component.

- **Q: How do I persist state across reloads?**

  - **A:** Use the `persist` middleware from `zustand/middleware`.

- **Q: How do I use Zustand with Next.js or SSR?**
  - **A:** See the [Zustand SSR guide](https://docs.pmnd.rs/zustand/integrations/server-side-rendering).

### FAQ

- **Can I use multiple stores?**

  - Yes! You can define as many stores as you need for different features or domains.

- **How do I use Zustand with TypeScript?**

  - Define your state and actions in a type/interface and pass it to `create<MyType>()`.

- **How do I test Zustand stores?**

  - You can use your store hooks in tests just like in components. Use [React Testing Library](https://testing-library.com/) or [Vitest](https://vitest.dev/).

- **How do I use Zustand with React Context?**
  - You can scope a store to a subtree using React context. See advanced examples above.

---

## TypeScript Tips

- Always type your store state and actions for best DX and autocomplete.
- Use `ReturnType<typeof useMyStore>` to type context values if using context.
- Use Zustand's middleware types for advanced patterns.

---

## Demo

You can try dynamic Zustand store creation and advanced patterns in this [Codesandbox demo](https://codesandbox.io/s/zustand-basic-usage-6v7w2) or in your local Storybook (see `/storybook`).

---

## Migration Guide: Custom Store to Zustand

If you were using the previous custom state management utilities (e.g., `createStore`, `useAppStore`, `useUserStore`, etc.), follow these steps to migrate to Zustand:

1. **Remove old imports:**

   - Delete any imports of `createStore`, `useAppStore`, `useUserStore`, `useThemeStore`, `useSettingsStore`, or similar from your code.

2. **Import Zustand's `create` from the library:**

   ```ts
   import { create } from "coreui";
   ```

3. **Define your own store:**

   - Use the `create` function to define your own store shape and actions (see examples above).

4. **Update usage in components:**

   - Replace usage of old store hooks with your new custom store hooks.

5. **(Optional) Use Zustand middleware:**
   - Add `persist`, `devtools`, `immer`, or other middleware as needed for your use case.

For more details, see the advanced usage and troubleshooting sections above.

---

## Common Zustand Recipes

### Authentication Store

```ts
import { create } from "coreui";

type AuthState = {
  user: { id: string; name: string } | null;
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Theme Toggler

```ts
import { create } from "coreui";

type ThemeState = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light",
  toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
}));
```

### Undo/Redo Pattern

```ts
import { create } from "coreui";

type UndoState = {
  past: number[];
  present: number;
  future: number[];
  set: (value: number) => void;
  undo: () => void;
  redo: () => void;
};

export const useUndoStore = create<UndoState>((set, get) => ({
  past: [],
  present: 0,
  future: [],
  set: (value) =>
    set((state) => ({
      past: [...state.past, state.present],
      present: value,
      future: [],
    })),
  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    }),
  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    }),
}));
```

### Form State Management

```ts
import { create } from "coreui";

type FormState = {
  values: Record<string, string>;
  setField: (field: string, value: string) => void;
  reset: () => void;
};

const initialForm = { name: "", email: "" };

export const useFormStore = create<FormState>((set) => ({
  values: initialForm,
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
    })),
  reset: () => set({ values: initialForm }),
}));
```

---

## Testing Zustand Stores

You can test Zustand stores using React Testing Library, Vitest, or Jest. Here is a simple example using Vitest:

```ts
import { create } from "coreui";
import { describe, it, expect } from "vitest";

type CounterState = { count: number; inc: () => void };
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

describe("useCounterStore", () => {
  it("increments the count", () => {
    useCounterStore.getState().inc();
    expect(useCounterStore.getState().count).toBe(1);
  });
});
```

---

## Storybook Demo

You can explore Zustand store usage and advanced patterns in the local Storybook demo included with this library.

### How to Run Storybook

1. Install dependencies (if you haven't already):
   ```sh
   npm install
   ```
2. Start Storybook:
   ```sh
   npm run storybook
   ```
3. Open the provided local URL (usually http://localhost:6006) in your browser.

### What You'll Find

- **Dynamic store creation** examples
- **Middleware usage** (devtools, immer, persist)
- **Scoped/context stores**
- **Async actions and selectors**

See the `State` section in Storybook for live demos and code for each pattern.

---
