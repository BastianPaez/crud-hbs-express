import { Router } from "express";
import { readFile } from "node:fs/promises";

const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch {
    }

    res.render('read', {archivoJson})
})

router.post('/', async (req, res) => {
    const archivoSeleccionado = Number(req.body.nombreArchivo); 

    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch {
    }
    const archivo = archivoJson.find( item => item.id === archivoSeleccionado )
    
    res.render('read', {archivoJson, archivo})
})


export default router;