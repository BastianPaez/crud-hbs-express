import { Router } from "express";
import { writeFile, readFile } from "node:fs/promises";

const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    }catch{
    }
    return res.render('create', {archivoJson});
})


router.post('/', async (req, res) => {
    const { nombre, contenido } = req.body;
    const id = Date.now();
    await writeFile(`./data/${nombre}.txt`, contenido)

    const archivo = { nombre, contenido, id }
    let archivoJson = '';

    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    }catch{
    }

    archivoJson = [...archivoJson, archivo];

    // console.log(archivoJson)
    await writeFile('./data/lista.json', JSON.stringify(archivoJson))

    return res.render('create', {archivoJson});
})



export default router;