import axios from "axios";
import { backend_URL } from "./config";

class Pokemon {

  constructor({ id, name, type, image_url, color, species }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.image_URL = image_url;
    this.speciesId = species;
    this.prev = null;
    this.next = [];
    this.color = color[0];
  }

  //
  static speciesList;

  //
  static async getAll() {
    const allPokemonList = await axios.get(`${backend_URL}/pokemon/get`);

    const data = allPokemonList.data;
    const new_list = [];

    for (let i = 0; i < data.length; i++) {
      const pokemon = new Pokemon(data[i]);
      new_list.push(pokemon);

      const prevEvolveFormId = data[i].prev_id;

      if (prevEvolveFormId) {
        new_list[i].prev = new_list[prevEvolveFormId - 1];
        new_list[prevEvolveFormId - 1].next.push(pokemon);
      }
    }

    return new_list;
  }

  //
  static getSpecies(pokemonList) {
    let speciesList = [];

    for (let pokemon of pokemonList) {

      if (pokemon.speciesId > speciesList.length)
        speciesList.push([pokemon]);
      else
        speciesList[pokemon.speciesId - 1].push(pokemon);
    }

    return speciesList;
  }

  //
  static async find(term) {
    const getPokemon = Number.isInteger(parseInt(term)) ?
      await axios.get(`${backend_URL}/pokemon/get`, { params: { id: term } }) :
      await axios.get(`${backend_URL}/pokemon/get`, { params: { name: term } });

    const data = getPokemon.data;
    const new_list = [];

    for (let i = 0; i < data.length; i++) {
      const pokemon = new Pokemon(data[i]);

      let lastIdx = new_list.length - 1;

      if (new_list.length === 0 || new_list[lastIdx][0].speciesId !== pokemon.speciesId)
        new_list.push([pokemon]);
      else
        new_list[lastIdx].push(pokemon);

      const prevEvolveFormId = data[i].prev_id;

      if (prevEvolveFormId) {

        // Linear search for previous evolved form
        for (let p of new_list[lastIdx]) {
          if (p.id === prevEvolveFormId) {
            pokemon.prev = p;
            p.next.push(pokemon);
            break;
          }
        }
      }
    }

    return new_list;
  }

}

export default Pokemon;