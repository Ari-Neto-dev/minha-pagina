// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     if ("serviceWorker" in navigator) {
//       // Remover qualquer SW antigo
//       navigator.serviceWorker.getRegistrations().then((registrations) => {
//         registrations.forEach((reg) => reg.unregister());
//       });

//       // Registrar o novo Service Worker
//       navigator.serviceWorker
//         .register("/service-worker.js")
//         .then((reg) => {
//           console.log("Novo Service Worker registrado!", reg);
//         })
//         .catch((err) => console.log("Erro ao registrar Service Worker:", err));
//     }
//   }, []);

//   return (
//     <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ color: "#007BFF" }}>Bem-vindo à Minha Página React!</h1>
//       <p>Esta é uma página simples feita com REACT e uso PWA.</p>
//       <button
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: "#007BFF",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//         onClick={() => alert("Olá, Amigos!AMARELO Ari, Rafaella, Rafael, Natália, Nadia e meu amor Sara")}
//       >
//         Clique aqui!
//       </button>
//     </div>
//   );
// }

// export default App;


//


import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => {
          console.log("Novo Service Worker registrado!", reg);
        })
        .catch((err) => console.log("Erro ao registrar Service Worker:", err));
    }

    // Detectar iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isIOSDevice && !isStandalone) {
      setIsIOS(true);
    }

    // Detectar opção de instalação para Android
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstall(true);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou a instalação");
        } else {
          console.log("Usuário recusou a instalação");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#007BFF" }}>Bem-vindo à Minha Página React!</h1>
      <p>Esta é uma página simples feita com React e configurada como PWA.</p>

      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
        onClick={() => alert("Olá, Amigos! AMARELO Ari, Rafaella, Rafael, Natália, Nadia e meu amor Sara")}
      >
        Clique aqui!
      </button>

      {/* Botão para Android */}
      {showInstall && (
        <button
          id="install-btn"
          onClick={handleInstallClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          📲 Instalar App
        </button>
      )}

      {/* Popup para iOS */}
      {isIOS && (
        <div
          id="ios-install-popup"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <p>
            Para instalar, clique em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

