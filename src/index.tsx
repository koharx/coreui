import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're importing from 'react-dom/client'
import App from "./App";
//import './styles/index.css';
//import { ThemeProvider } from './app/providers/ThemeProvider';

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    //<ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    //</ThemeProvider>
  );
}
