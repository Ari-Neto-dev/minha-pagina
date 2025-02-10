import React from "react";
import ReactDOM from "react-dom/client"; // A partir do React 18
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Importando o arquivo de registro do SW

// Cria o root da aplicação com React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registra o Service Worker para ativar o modo PWA
serviceWorkerRegistration.register(); // Registra o Service Worker aqui

