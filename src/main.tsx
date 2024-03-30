import React from "react";
import { createRoot } from "react-dom/client"; // Make sure this import is correct
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App"; // You don't need to specify the extension

// If you have global styles, you can uncomment the next line
// import './index.css';

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
