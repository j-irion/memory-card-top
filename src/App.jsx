import { useEffect, useState } from 'react';
import Card from './Card.jsx';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    const randomPokemon = await response.json();
    return randomPokemon;
  };

  const fetchAllPokemon = async () => {
    const pokemonArray = [];
    for (let i = 0; i < 12; i++) {
      const pokemon = await fetchPokemon();
      pokemonArray.push(pokemon);
    }
    setPokemonList(pokemonArray);
  };

  const shuffleArray = (array) => {
    let newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (score === 12) {
      alert('You won!');
      setScore(0);
      fetchAllPokemon();
      setClickedPokemon([]);
    } else {
      const shuffledPokemonList = shuffleArray(pokemonList);
      setPokemonList(shuffledPokemonList);
    }
  }, [score]);

  const handleCardClick = (id) => {
    console.log(id);
    if (!clickedPokemon.includes(id)) {
      setClickedPokemon(clickedPokemon + id);
      if (score === highscore) setHighscore(highscore + 1);
      setScore(score + 1);
      return;
    }
    setScore(0);
    setClickedPokemon([]);
    fetchAllPokemon();
  };

  return (
    <>
      <header>
        <h1>Pokemon Memory Card</h1>
        <div id='scoreboard'>
          <div>Highscore: {highscore}</div>
          <div>Score: {score}</div>
        </div>
      </header>
      <div id='pokemonList'>
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            pokemonName={pokemon.name}
            imgSrc={pokemon.sprites.front_default}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default App;
