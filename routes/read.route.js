import { Router } from "express";
import { writeFile, readFile } from "node:fs/promises";

const router = Router();

router.get('/', async (req, res) => {
  res.render('read')
})

export default router;