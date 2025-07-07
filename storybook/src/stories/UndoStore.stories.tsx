// Story: Zustand Undo/Redo Store Demo
// Demonstrates undo/redo pattern with Zustand
import React from "react";
import { create } from "zustand";

type UndoState = {
  past: number[];
  present: number;
  future: number[];
  set: (value: number) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
};

const useUndoStore = create<UndoState>((set, get) => ({
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
  reset: () => set({ past: [], present: 0, future: [] }),
}));

const UndoDemo = () => {
  const present = useUndoStore((s) => s.present);
  const set = useUndoStore((s) => s.set);
  const undo = useUndoStore((s) => s.undo);
  const redo = useUndoStore((s) => s.redo);
  const reset = useUndoStore((s) => s.reset);
  const past = useUndoStore((s) => s.past);
  const future = useUndoStore((s) => s.future);
  return (
    <div style={{ padding: 24, borderRadius: 8, background: "#f8f8f8" }}>
      <div>
        Current value: <b>{present}</b>
      </div>
      <button
        aria-label="Increment"
        onClick={() => set(present + 1)}
        style={{ marginRight: 8 }}
      >
        Increment
      </button>
      <button
        aria-label="Undo"
        onClick={undo}
        style={{ marginRight: 8 }}
        disabled={past.length === 0}
      >
        Undo
      </button>
      <button
        aria-label="Redo"
        onClick={redo}
        style={{ marginRight: 8 }}
        disabled={future.length === 0}
      >
        Redo
      </button>
      <button aria-label="Reset" onClick={reset}>
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
        {JSON.stringify({ past, present, future }, null, 2)}
      </pre>
    </div>
  );
};

export default {
  title: "State/UndoRedo/UndoStore",
  component: UndoDemo,
  parameters: {
    docs: {
      description: {
        component: `A Zustand store for undo/redo state management.

**Usage tips:**
- Try incrementing, undoing, redoing, and resetting.
- The current state is shown as JSON for debugging.
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

export const Default = () => <UndoDemo />;
