import React from 'react';
import { Card } from 'react-bootstrap';
import Trainer from './Trainer';
import { useUser } from './useUser';

function MyPokecard({ p, setPokemonList }) {
  const { user } = useUser();

  const handleFeed = async (evt) => {
    evt.preventDefault();

    await Trainer.feedMyPokemon(user.id, p.trainerPokemonId);
    await Trainer.getMyPokemon(user.id)
    .then(p => setPokemonList(p));
  }

  const handleRelease = async(evt) => {
    evt.preventDefault();

    await Trainer.releaseMyPokemon(user.id, p.trainerPokemonId);
    await Trainer.getMyPokemon(user.id)
    .then(p => setPokemonList(p));
  }

  return (
    <Card className="pokecard flex-fill" style={{ backgroundColor: p.color[0] }}>
      <Card.Body>
        <Card.Img key={p.name + '-img'} src={p.image_url} alt="p.name" style={{ width: '100%' }} className="image-container"></Card.Img>
        <Card.Text key={p.name + '-name'} className="text-center">#{p.id} {p.name}</Card.Text>
        <button className="side-to-side poke-button" onClick={handleFeed}>FEED</button>
        <button className="side-to-side poke-button" onClick={handleRelease}>RELEASE</button>
      </Card.Body>
    </Card >
  );
}

export default MyPokecard;