import express from 'express';
import { engine } from 'express-handlebars';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import routerCreate from './routes/create.route.js';
import routerRead from './routes/read.route.js';
import routerUpdate from './routes/update.route.js';
import routerDelete from './routes/delete.route.js';
import routerHome from './routes/home.route.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'))

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname, '/views'));

app.use('/', routerHome);
app.use('/create', routerCreate);
app.use('/read', routerRead);
app.use('/update', routerUpdate);
app.use('/delete', routerDelete);


app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})