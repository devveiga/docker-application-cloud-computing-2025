import { Router } from "express";
import { client } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { nome } = req.body;

  const result = await client.query(
    "INSERT INTO usuarios (nome) VALUES ($1) RETURNING *",
    [nome]
  );

  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await client.query("SELECT * FROM usuarios");
  res.json(result.rows);
});

export default router;
