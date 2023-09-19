import express from 'express';

import { getPokemon } from './functions.js';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name;
    try {
        const pokemon = await getPokemon(pokemonName);
        res.json(pokemon)
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})