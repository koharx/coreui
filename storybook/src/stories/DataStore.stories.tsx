import React from "react";
import { create } from "zustand";

// Define the store ONCE at the module level using Zustand
interface DataState {
  data: string | null;
  setData: (data: string) => void;
}

const useDataStore = create<DataState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

// Storybook component
const AsyncDataComponent = () => {
  const data = useDataStore((s) => s.data);
  const setData = useDataStore((s) => s.setData);

  const fetchData = async () => {
    // Simulate async fetch
    await new Promise((res) => setTimeout(res, 500));
    setData("Fetched from async!");
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <div>Data: {data}</div>
    </div>
  );
};

export default {
  title: "State/AsyncDataStore",
  component: AsyncDataComponent,
};

export const Default = () => <AsyncDataComponent />;
