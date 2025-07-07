import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DevtoolsState {
  count: number;
  inc: () => void;
}

// Define the store ONCE at the module level using Zustand with devtools
const useDevtoolsStore = create<DevtoolsState>()(
  devtools(
    (set) => ({
      count: 0,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: "DevtoolsStore" }
  )
);

const DevtoolsComponent = () => {
  const count = useDevtoolsStore((s) => s.count);
  const inc = useDevtoolsStore((s) => s.inc);
  return (
    <div>
      <button onClick={inc}>Increment</button>
      <div>Count: {count}</div>
      <div>Open Redux DevTools to inspect state changes.</div>
    </div>
  );
};

export default {
  title: "State/DevtoolsStore",
  component: DevtoolsComponent,
};

export const Default = () => <DevtoolsComponent />;
