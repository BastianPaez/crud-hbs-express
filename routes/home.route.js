import { Router } from "express";
import { readFile} from "node:fs/promises";
const router = Router();

router.get('/', async (req, res) => {
    let archivoJson = '';
    try {
        archivoJson = JSON.parse(await readFile('./data/lista.json', 'utf-8'));
    } catch (err){
        console.log(err)
    }

    console.log(archivoJson)
    res.render('home', {archivoJson})
})

export default router;