export default function Card({ id, pokemonName, imgSrc, handleCardClick }) {
  return (
    <div className='pokemonCard' onClick={() => handleCardClick(id)}>
      <p>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</p>
      <img src={imgSrc} alt={pokemonName} />
    </div>
  );
}
