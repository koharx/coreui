import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're importing from 'react-dom/client'
import App from "./App";
import { AlertProvider } from "./core/alerts/AlertContext";
import { AuthProvider } from "./core/authcontext";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AlertProvider>
        <App />
      </AlertProvider>
    </React.StrictMode>
  );
}
