import connectionString from './credentials.js'

import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const pokemonSchema = new Schema({
 name: { type: String, required: true },
 category: String,
 type: Array,
 dexNum: Number,
 debut: String
});

export const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon');