import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Remover qualquer SW antigo
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister());
      });

      // Registrar o novo Service Worker
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => {
          console.log("Novo Service Worker registrado!", reg);
        })
        .catch((err) => console.log("Erro ao registrar Service Worker:", err));
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#007BFF" }}>Bem-vindo à Minha Página React!</h1>
      <p>Esta é uma página simples feita com REACT e uso PWA.</p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => alert("Olá, Amigos!AMARELO Ari, Rafaella, Rafael, Natália, Nadia e meu amor Sara")}
      >
        Clique aqui!
      </button>
    </div>
  );
}

export default App;
