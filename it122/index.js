//#region Set Up
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import data
import { Pokemon } from "./models/Pokemon.js";
//Import express
'use strict';
import express from 'express';
const app = express();
// Import cors
import cors from 'cors';
app.use(cors());
// Used to parse JSON bodies
app.use(express.json());
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
//#endregion
//#region Server Routes
//#region regular routes
// Home Page route
app.get('/', (req, res, next) => {
    Pokemon.find({}).lean()
        .then((pokemon) => {
        res.render('home', { pokemon });
    })
        .catch(err => console.log(err));
});
// Detail page
app.get('/detail', (req, res, next) => {
    Pokemon.findOne({ name: req.query.name }).lean()
        .then((pokemon) => {
        res.render('detail', { result: pokemon });
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
        }
        else {
            res.render('delete', { result: pokemon });
        }
    })
        .catch(err => next(err));
});
// About Page route
app.get('/about', (req, res) => {
    res.status(200).send('My name is Austin. I am in IT 122.');
});
//#endregion
//#region api routes
// Get pokemon API route
app.get('/api/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        let pokemon;
        if (name) {
            // If name, find pokemon by name
            pokemon = yield Pokemon.findOne({ name }).lean();
        }
        else {
            // If no name, return all
            pokemon = yield Pokemon.find({}).lean();
        }
        if (pokemon) {
            return res.json(pokemon);
        }
        else {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
    }
    catch (err) {
        console.error("Error retrieving Pokémon:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//Add/update API route
app.post('/api/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, type, dex_num, debut, picture } = req.body;
    if (!name || !category || !type || !dex_num || !debut || !picture) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        // Check if pokemon exists
        const existingPokemon = yield Pokemon.findOne({ name });
        if (existingPokemon) {
            // Update if exists
            existingPokemon.category = category;
            existingPokemon.type = type;
            existingPokemon.dex_num = dex_num;
            existingPokemon.debut = debut;
            existingPokemon.picture = picture;
            yield existingPokemon.save();
            return res.json({ message: 'Pokémon updated successfully', pokemon: existingPokemon });
        }
        else {
            // Create new pokemon
            const newPokemon = new Pokemon({ name, category, type, dex_num, debut, picture });
            yield newPokemon.save();
            return res.status(201).json({ message: 'Pokémon created successfully', pokemon: newPokemon });
        }
    }
    catch (err) {
        console.error('Error saving Pokémon:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Delete API route
app.delete('/api/pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name parameter is required' });
    }
    try {
        const result = yield Pokemon.deleteOne({ name });
        if (result.deletedCount > 0) {
            return res.json({ message: 'Pokémon deleted successfully' });
        }
        else {
            return res.status(404).json({ message: 'Pokémon not found' });
        }
    }
    catch (err) {
        console.error('Error deleting Pokémon:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//#endregion
// 404 Error
app.use((req, res) => {
    res.status(404).send('Not found');
});
//#endregion
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
