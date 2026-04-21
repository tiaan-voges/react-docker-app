import { getPokemonImage, prettify } from "../utils/characterUtils";

import SearchableSelect from "./SearchableSelect";

export default function PokemonPanel({
  pokemonListStatus,
  pokemonError,
  pokemonList,
  selectedPokemon,
  setSelectedPokemon,
  pokemonSpotlightChoices,
  pokemonDetailsStatus,
  pokemonDetails,
  pokemonPower,
}) {
  return (
    <article className="panel pokemon-panel">
      <h2>Pokemon Menu</h2>
      <p className="panel-copy">Select from the original 151 Pokemon.</p>

      {pokemonListStatus === "error" ? (
        <p className="message error">Could not load Pokemon data: {pokemonError}</p>
      ) : (
        <>
          <SearchableSelect
            id="pokemon-select"
            label="Choose a Pokemon"
            options={pokemonList.map((name) => ({
              value: name,
              label: prettify(name),
            }))}
            value={selectedPokemon}
            onChange={setSelectedPokemon}
            disabled={pokemonListStatus !== "ready"}
            placeholder="Search Pokemon..."
          />

          <div className="chip-menu">
            {pokemonSpotlightChoices.map((name) => (
              <button
                key={name}
                type="button"
                className={selectedPokemon === name ? "chip active" : "chip"}
                onClick={() => setSelectedPokemon(name)}
              >
                {prettify(name)}
              </button>
            ))}
          </div>
        </>
      )}

      {pokemonDetailsStatus === "loading" && (
        <p className="message">Loading Pokemon details...</p>
      )}

      {pokemonDetails && pokemonDetailsStatus === "ready" && (
        <div className="profile-card">
          <img
            src={getPokemonImage(pokemonDetails)}
            alt={prettify(pokemonDetails.name)}
            className="portrait"
          />
          <h3>{prettify(pokemonDetails.name)}</h3>
          <ul className="stats-list">
            <li>
              Types:{" "}
              {pokemonDetails.types.map((item) => prettify(item.type.name)).join(", ")}
            </li>
            <li>Height: {pokemonDetails.height / 10} m</li>
            <li>Weight: {pokemonDetails.weight / 10} kg</li>
            <li>Base Power: {pokemonPower}</li>
          </ul>
        </div>
      )}
    </article>
  );
}
