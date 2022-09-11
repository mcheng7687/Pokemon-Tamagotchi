import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import MyPokecard from './MyPokecard';
import Pokemon from './Pokemon';
import Trainer from './Trainer';
import { useUser } from './useUser';

function MyPokemon() {
  const { user } = useUser();
  const [PokemonList, setPokemonList] = useState([]);

  Trainer.getMyPokemon(user.id)
  .then(p => setPokemonList(p));

  const handleClick = evt => {
    evt.preventDefault();

    const newPokemon = Pokemon.speciesList[Math.floor(Math.random() * Pokemon.speciesList.length)][0];
    Trainer.addToMyPokemon(user.id, newPokemon.id);
  }

  return (
    <>
      <button className="center" id="add-form" onClick={handleClick}>
        <div className="center">GET A NEW RANDOM POKEMON</div>
      </button>
      <Container>
        {PokemonList
          .map(pokemon => {
            return <MyPokecard key={pokemon.trainerPokemonId} p={pokemon} />;
          })}
      </Container>
    </>
  );
}

export default MyPokemon;