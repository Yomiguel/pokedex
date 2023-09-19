import { BASE_URL } from "./url.js";

export const getPokemon = async (name) => {

    const abilities = [];
    const moves = [];
    const types = [];
    const stats = {};
    let img;

    const url = `${BASE_URL}${name}/`;
    const response = await fetch(url);
    const data = await response.json();

    for (let element in data) {
        if (element == "abilities") {
            for (let ability in data[element])
                abilities.push(data[element][ability].ability.name)
        } else if (element == "moves") {
            for (let move in data[element]) {
                moves.push(data[element][move].move.name)
            }
        } else if (element == "types") {
            for (let type in data[element]) {
                types.push(data[element][type].type.name)
            }
        } else if (element == "stats") {
            for (let stat in data[element]) {
                stats[data[element][stat].stat.name] = data[element][stat].base_stat
            }
        } else if (element == "sprites") {
            for (let sprite in data[element]) {
                if (sprite == "other") {
                    img = data[element][sprite]["official-artwork"].front_default
                }
            }
        }
    }

    const pokemon = {
        "id": data.id,
        "name": data.name,
        "height": data.height,
        "weight": data.weight,
        "abilities": abilities,
        "moves": moves,
        "types": types,
        "stats": stats,
        "img": img,
    }

    return pokemon;
};