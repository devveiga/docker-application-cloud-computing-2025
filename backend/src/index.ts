import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuarios";
import { connectDB } from "./db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuariosRoutes);

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  await connectDB();
});
