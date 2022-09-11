import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Pokecard from './Pokecard';
import SearchForm from './SearchForm';
import Pokemon from './Pokemon';

function PokemonList() {
  const [PokemonSpeciesList, setPokemonSpeciesList] = useState([]);

  useEffect(() => {
    
    Pokemon.getAll().then(data => {
      setPokemonSpeciesList(Pokemon.getSpecies(data));
    });

  }, []);

  return (
    <>
      <SearchForm setSearchResult={setPokemonSpeciesList} />
      <Container>
        {PokemonSpeciesList
          .map(pokemonSpecies => {
            return <Pokecard key={pokemonSpecies[0].speciesId} pokemonSpecies={pokemonSpecies} />;
          })}
      </Container>
    </>
  );
}

export default PokemonList;