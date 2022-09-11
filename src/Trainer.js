import axios from "axios";
import { backend_URL } from "./config";

class Trainer {
  // Logged in Trainer id and pokemon list
  static pokemonList;
  static reqHeaderAxios;

  static setHeaderAxios(token) {
    this.reqHeaderAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Login by requesting associated token from backend and then requesting for user info
  static async login(formData) {

    const trainer = await axios.post(`${backend_URL}/trainer/login`, {
      email: formData.email,
      password: formData.password
    });

    this.setHeaderAxios(trainer.data.token);

    return trainer.data;
  }

  // Retrieves token from backend with formData {email, password, first_name, last_name}
  static async signUp(formData) {

    const trainer = await axios.post(`${backend_URL}/trainer/register`, {
      email: formData.email,
      password: formData.password,
      firstName: formData.first_name,
      lastName: formData.last_name
    });

    this.setHeaderAxios(trainer.data.token);

    return trainer.data;
  }

  static async setProfile({ email, firstName, lastName, id }) {
    const trainer = await this.reqHeaderAxios.patch(`${backend_URL}/trainer`, {
      email,
      firstName,
      lastName
    }, { params: { id } });

    console.log(`Updated trainer ${trainer.data.trainer.id}`)

    return trainer.data.trainer;
  }

  static async getMyPokemon(id) {
    const trainerPokemon = await this.reqHeaderAxios.get(`${backend_URL}/trainer/myPokemon`, { params: { id } });

    return trainerPokemon.data;
  }

  static async addToMyPokemon(id, pokemonId) {
    const trainerPokemon = await this.reqHeaderAxios.post(`${backend_URL}/trainer/myPokemon/add`, null, { params: { id, pokemonId } });

    console.log(trainerPokemon.data);

    return trainerPokemon.data;
  }

  static async feedMyPokemon(id, trainerPokemonId) {
    const trainerPokemon = await this.reqHeaderAxios.post(`${backend_URL}/trainer/myPokemon/feed`, null, { params: { id, myPokemonId: trainerPokemonId } });

    console.log(`Fed pokemon id ${trainerPokemon.data.pokemonId} with hunger ${trainerPokemon.data.hunger}`);

    return trainerPokemon.data;
  }

  static async releaseMyPokemon(id, trainerPokemonId) {
    const trainerPokemon = await this.reqHeaderAxios.post(`${backend_URL}/trainer/myPokemon/release`, null, { params: { id, myPokemonId: trainerPokemonId } });

    console.log(`Released pokemon. Bye bye! ${trainerPokemon.data.message}`);

    return trainerPokemon.data;  
  }
}

export default Trainer;