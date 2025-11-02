import React from "react";
import ReactDOM from "react-dom/client"; // Import correto para React 18
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"; // Importa as rotas da aplicação

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria a raiz
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
