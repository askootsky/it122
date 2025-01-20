// Import from data.js
import { getAllPokes, getOnePoke } from './data.js';

//Import express
'use strict'
import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');

// Home Page route
app.get('/', (req, res) => {
    res.render('home', {pokes: getAllPokes()});
});

// Detail page
app.get('/detail', (req, res) => {
    console.log(req.query)
    let result = getOnePoke(req.query.name);
    res.render('detail', {
        name: req.query.name,
        result
        }
    );
});

// About Page route
app.get('/about', (req, res) => {
    res.status(200).send('My name is Austin. I am in IT 122.');
});

// 404 Error
app.use((req, res) => {
    res.status(404).send('Not found');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
