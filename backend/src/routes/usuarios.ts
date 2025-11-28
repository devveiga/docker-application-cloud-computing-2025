import { Router } from "express";
import { client } from "../db";

const router = Router();

router.post("/", async (req, res) => {
  const { nome, professor_favorito, semestre, curso } = req.body;

  const result = await client.query(
    `
    INSERT INTO usuarios (nome, professor_favorito, semestre, curso)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [nome, professor_favorito, semestre, curso]
  );

  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await client.query("SELECT * FROM usuarios");
  res.json(result.rows);
});

export default router;
