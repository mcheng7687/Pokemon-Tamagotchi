import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Fade } from 'react-slideshow-image';
import { displayTimer, transDurationTimer } from './config';

import 'react-slideshow-image/dist/styles.css';

function Pokecard({ pokemonSpecies }) {
  const [pokemonSlides] = useState(pokemonSpecies);
  const [index, set] = useState(0);
  const [cardColor, setCardColor] = useState(pokemonSlides[index].color);

  useEffect(() => {
    setTimeout(() => {
      const newIndex = (index + 1) % pokemonSlides.length;
      setCardColor(pokemonSlides[newIndex].color);
      set(newIndex);
    }, displayTimer + transDurationTimer);
  }, [index, pokemonSlides]);

  return (
    <Card className="pokecard flex-fill" style={{ backgroundColor: cardColor }}>
      <Card.Body className="slide-container">
        <Fade duration={displayTimer} transitionDuration={transDurationTimer} pauseOnHover={false} indicators={true} arrows={false}>
          {pokemonSlides.map(p =>
            <div key={p.name} className="each-fade">
              <Card.Img key={p.name + '-img'} src={p.image_URL} alt="slide" style={{ width: '100%' }} className="image-container"></Card.Img>
              <Card.Text key={p.name + '-name'} className="text-center">#{p.id} {p.name}</Card.Text>
            </div>
          )}
        </Fade>
      </Card.Body>
    </Card >
  );
}

export default Pokecard;