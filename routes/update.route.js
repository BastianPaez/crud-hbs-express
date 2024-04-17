import { Router } from "express";
import { readFile, writeFile } from "node:fs/promises";

const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch {
    }

    res.render('update', {archivoJson})
})

router.post('/', async (req, res) => {
    const archivoSeleccionado = Number(req.body.nombreArchivo); 
    const nuevoNombre = req.body.nombre;
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch {
    }

    let archivo = archivoJson.find( item => item.id === archivoSeleccionado )
    archivoJson = archivoJson.filter( item => item.id !== archivoSeleccionado )

    archivo.nombre = nuevoNombre;

    archivoJson = [...archivoJson, archivo];
    console.log(archivoJson)

    await writeFile('./data/lista.json', JSON.stringify(archivoJson))



    res.render('update', {archivoJson})
})



export default router;