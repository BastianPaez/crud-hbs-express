import { Router } from "express";
import { readFile, writeFile, unlink } from "node:fs/promises";

const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch {
    }

    res.render('delete', {archivoJson})
})

router.post('/', async (req, res) => {
    const archivoSeleccionado = Number(req.body.nombreArchivo); 
    let archivoJson = '';

    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));

        let archivo = archivoJson.find( item => item.id === archivoSeleccionado )
        await unlink(`./data/${archivo.nombre}.txt`);

        archivoJson = archivoJson.filter( item => item.id !== archivoSeleccionado )
        await writeFile('./data/lista.json', JSON.stringify(archivoJson))
    } catch {
    }

    res.render('delete', {archivoJson})
})



export default router;