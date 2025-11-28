import React, { useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  professor_favorito: string;
  semestre: string;
  curso: string;
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
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Lista de Usuários</h2>

      <button 
        onClick={handleFetch} 
        disabled={loading}
        style={{
          marginBottom: "15px",
          padding: "10px 18px",
          borderRadius: "6px",
          border: "none",
          background: "#e64eeb",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        {loading ? "Carregando..." : "Carregar Usuários"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {usuarios.length > 0 ? (
        <table 
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#212c42",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <thead style={{ background: "#e64eeb" }}>
            <tr>
              {["ID", "Nome", "Professor Favorito", "Semestre", "Curso"].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "12px 8px",
                    borderBottom: "1px solid #e64eeb",
                    textAlign: "left",
                    fontWeight: "600"
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={td}>{u.id}</td>
                <td style={td}>{u.nome}</td>
                <td style={td}>{u.professor_favorito}</td>
                <td style={td}>{u.semestre}</td>
                <td style={td}>{u.curso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
}

const td = {
  padding: "10px 8px",
  borderBottom: "1px solid #eee"
};

export default UserList;
