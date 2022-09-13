import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import MyPokecard from './MyPokecard';
import Pokemon from './Pokemon';
import Trainer from './Trainer';
import { useUser } from './useUser';

function MyPokemon() {
  const { user } = useUser();
  const [PokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    Trainer.getMyPokemon(user.id)
      .then(p => setPokemonList(p));
  });

  const handleClick = async (evt) => {
    evt.preventDefault();

    const newPokemon = Pokemon.speciesList[Math.floor(Math.random() * Pokemon.speciesList.length)][0];
    await Trainer.addToMyPokemon(user.id, newPokemon.id);
    await Trainer.getMyPokemon(user.id)
      .then(p => setPokemonList(p));
  }

  return (
    <>
      <button className="center" id="add-form" onClick={handleClick}>
        <div className="center">GET A NEW RANDOM POKEMON</div>
      </button>
      <Container>
        {PokemonList
          .map(pokemon => {
            return <MyPokecard key={pokemon.trainerPokemonId} p={pokemon} setPokemonList={setPokemonList}/>;
          })}
      </Container>
    </>
  );
}

export default MyPokemon;