import React from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TodoState = { todos: string[]; addTodo: (todo: string) => void };

// Define the store ONCE at the module level using Zustand with immer
const useTodoStore = create<TodoState>()(
  immer((set) => ({
    todos: [],
    addTodo: (todo) =>
      set((state) => {
        state.todos.push(todo);
      }),
  }))
);

const ImmerComponent = () => {
  const todos = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const [input, setInput] = React.useState("");
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          addTodo(input);
          setInput("");
        }}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default {
  title: "State/ImmerStore",
  component: ImmerComponent,
};

export const Default = () => <ImmerComponent />;
