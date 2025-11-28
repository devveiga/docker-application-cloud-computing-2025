import React, { useState } from "react";

function UserRegister() {
  const [nome, setNome] = useState("");
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
        body: JSON.stringify({ nome }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Erro ao cadastrar");
      }

      setMessage(`Usuário criado! Nome: ${nome}`);
      setNome("");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Cadastrar Usuário</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
      )}

    
    </div>
  );
}

export default UserRegister;
