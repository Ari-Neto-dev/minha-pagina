

function App() {
  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#007BFF" }}>Bem-vindo à Minha Página React!</h1>
      <p>
        Esta é uma página simples feita com REACT e uso PWA.
      </p>
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
        onClick={() => alert("Olá, Amigo!")}
      >
        Clique aqui!
      </button>
    </div>
  );
}

export default App;

