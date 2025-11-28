import React, { useState } from "react";

interface Usuario {
  id: number;
  nome: string;
}

function UserList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFetch() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/usuarios");

      if (!response.ok) {
        throw new Error("Erro ao carregar usuários");
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Lista de Usuários</h2>

      <button onClick={handleFetch} disabled={loading} style={{ marginBottom: "10px" }}>
        {loading ? "Carregando..." : "Carregar Usuários"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            <strong>ID:</strong> {u.id} — <strong>Nome:</strong> {u.nome}
          </li>
        ))}
      </ul>

      {usuarios.length === 0 && !loading && <p>Nenhum usuário cadastrado.</p>}
    </div>
  );
}

export default UserList;
