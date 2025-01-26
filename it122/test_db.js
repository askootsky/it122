import { Pokemon } from "./models/Pokemon.js";

// // return all records
// console.log('All records')
// Pokemon.find({}).lean()
//   .then((pokemon) => {
//     console.log(pokemon);
//   })
//   .catch(err => console.log(err));

// return all records that match a condition
// console.log('All fire types')
// Pokemon.find({"type": "Fire" }).lean()
//   .then((pokemon) => {
//     console.log(pokemon);
//   })
//   .catch(err => console.log(err));

// // return a single record
// console.log('Heracross')
// Pokemon.findOne({"name": "Heracross" }).lean()
//   .then((pokemon) => {
//       console.log(pokemon);;
//   })
//   .catch(err => console.log(err));

// // delete a single record
Pokemon.deleteOne({"name": "Froslass" })
  .then((result) => {
      console.log('Now deleting...')
      console.log(result);;
  })
  .catch(err => console.log(err));

// insert or update a single record
// const newPokemon = {'name':'Snorlax', 'category':'Sleeping Pokemon', 'type': 'Normal', 'dex_num':214, 'debut':'Generation I' }
// Pokemon.updateOne({ title: newPokemon.title}, newPokemon, {upsert:true})
// .then(result => console.log(result))
// .catch(err => console.log(err));