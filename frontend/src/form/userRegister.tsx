import React, { useState } from "react";

function UserRegister() {
  const [nome, setNome] = useState("");
  const [professorFavorito, setProfessorFavorito] = useState("");
  const [semestre, setSemestre] = useState("");
  const [curso, setCurso] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          professor_favorito: professorFavorito,
          semestre,
          curso,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao cadastrar");
      }

      setMessage(`Usuário criado! Nome: ${data.nome}`);

      setNome("");
      setProfessorFavorito("");
      setSemestre("");
      setCurso("");

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div 
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        padding: "30px",
        background: "#212c42",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Cadastrar Usuário</h2>

      <form 
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <FormGroup label="Nome">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={inputStyle}
          />
        </FormGroup>

        <FormGroup label="Professor Favorito">
          <input
            type="text"
            value={professorFavorito}
            onChange={(e) => setProfessorFavorito(e.target.value)}
            style={inputStyle}
          />
        </FormGroup>

        <FormGroup label="Semestre">
          <input 
            type="text"
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            style={inputStyle}
          />
        </FormGroup>

        <FormGroup label="Curso">
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            style={inputStyle}
          />
        </FormGroup>

        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#e64eeb",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "green", textAlign: "center" }}>
          {message}
        </p>
      )}
    </div>
  );
}

function FormGroup({ label, children }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ marginBottom: "6px", fontWeight: "500"}}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #e64eeb",
  outline: "none",
  fontSize: "14px",
  background: "#ffffffff",
  color: "black"
};

export default UserRegister;
