// Import from data.js
import { Pokemon } from "./models/Pokemon.js";

//Import express
'use strict'
import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded());

app.set('view engine', 'ejs');

// Home Page route
app.get('/', (req, res, next) => {
    Pokemon.find({}).lean()
        .then((pokemon) => {
            res.render('home', { pokemon });
        })
        .catch(err => console.log(err));
});

// Detail page
app.get('/detail', (req,res,next) => {
    Pokemon.findOne({ name:req.query.name }).lean()
        .then((pokemon) => {
            res.render('detail', {result: pokemon} );
        })
        .catch(err => next(err));
});

// Delete item route
app.get('/delete', (req, res, next) => {
    Pokemon.findOne({ name: req.query.name }).lean()
        .then((pokemon) => {
            if (pokemon) {
                return Pokemon.deleteOne({ name: req.query.name })
                    .then(() => {
                        res.render('delete', { result: pokemon });
                    });
            } else {
                res.render('delete', { result: pokemon });
            }
        })
        .catch(err => next(err));
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
