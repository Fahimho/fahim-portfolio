import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { ContentProvider } from "./context/ContentContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter basename="/fahim-portfolio">
          <App />
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  </React.StrictMode>
);