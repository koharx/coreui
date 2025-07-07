import React, { createContext, useContext } from "react";
import { create } from "zustand";

// Store factory defined at module level. Each provider instance creates its own store for scoping.
const useCounterStore = () =>
  create<{ count: number; inc: () => void }>((set) => ({
    count: 0,
    inc: () => set((s) => ({ count: s.count + 1 })),
  }));

const CounterContext = createContext<ReturnType<typeof useCounterStore> | null>(
  null
);

const CounterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useCounterStore();
  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

const useCounter = () => {
  const store = useContext(CounterContext);
  if (!store) throw new Error("useCounter must be used within CounterProvider");
  return store;
};

const CounterComponent = () => {
  const count = useCounter()((s) => s.count);
  const inc = useCounter()((s) => s.inc);
  return (
    <div>
      <button onClick={inc}>Increment</button>
      <div>Count: {count}</div>
      <div>This store is scoped to this provider subtree.</div>
    </div>
  );
};

export default {
  title: "State/ScopedStore",
  component: CounterComponent,
  decorators: [
    (Story: any) => (
      <CounterProvider>
        <Story />
      </CounterProvider>
    ),
  ],
};

export const Default = () => <CounterComponent />;
