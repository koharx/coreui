// Story: Zustand Form State Store Demo
// Demonstrates form field management with Zustand
import React from "react";
import { create } from "zustand";

type FormState = {
  values: { name: string; email: string };
  setField: (field: keyof FormState["values"], value: string) => void;
  reset: () => void;
};

const initialForm = { name: "", email: "" };

const useFormStore = create<FormState>((set) => ({
  values: initialForm,
  setField: (field, value) =>
    set((state) => ({
      values: { ...state.values, [field]: value },
    })),
  reset: () => set({ values: initialForm }),
}));

const FormDemo = () => {
  const values = useFormStore((s) => s.values);
  const setField = useFormStore((s) => s.setField);
  const reset = useFormStore((s) => s.reset);
  return (
    <div style={{ padding: 24, borderRadius: 8, background: "#f8f8f8" }}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          aria-label="Name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          aria-label="Email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>
      <button style={{ marginTop: 12 }} aria-label="Reset form" onClick={reset}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <b>Current values:</b>
        <pre style={{ background: "#eee", padding: 8, borderRadius: 4 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default {
  title: "State/Form/FormStore",
  component: FormDemo,
  parameters: {
    docs: {
      description: {
        component: `A Zustand store for managing form fields and reset action.

**Usage tips:**
- Edit the fields and reset the form.
- The current form state is shown as JSON for debugging.
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

export const Default = () => <FormDemo />;
