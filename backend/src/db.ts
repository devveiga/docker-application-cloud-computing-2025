import { Client } from "pg";

export const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("📌 Conectado ao Postgres!");

    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100)
      );
    `);
  } catch (err) {
    console.error("❌ Erro ao conectar no Postgres:", err);
    process.exit(1);
  }
}
