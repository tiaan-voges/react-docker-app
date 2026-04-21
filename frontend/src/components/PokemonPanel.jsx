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
  theme,
}) {
  const chipBase =
    "rounded-full border px-3 py-1.5 text-xs transition sm:text-sm";

  return (
    <article
      className={`rounded-2xl border border-white/15 bg-gradient-to-b p-5 shadow-xl shadow-black/35 backdrop-blur-sm ${theme.pokemonPanel}`}
    >
      <h2 className={`font-serif text-xl font-bold ${theme.panelTitle}`}>Pokemon Menu</h2>
      <p className={`mb-4 mt-2 text-sm ${theme.panelCopy}`}>
        Select from the original 151 Pokemon.
      </p>

      {pokemonListStatus === "error" ? (
        <p className={`mt-3 text-sm ${theme.error}`}>
          Could not load Pokemon data: {pokemonError}
        </p>
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
            theme={theme}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {pokemonSpotlightChoices.map((name) => (
              <button
                key={name}
                type="button"
                className={`${chipBase} ${
                  selectedPokemon === name ? theme.chipActive : theme.chipIdle
                }`}
                onClick={() => setSelectedPokemon(name)}
              >
                {prettify(name)}
              </button>
            ))}
          </div>
        </>
      )}

      {pokemonDetailsStatus === "loading" && (
        <p className={`mt-3 text-sm ${theme.message}`}>Loading Pokemon details...</p>
      )}

      {pokemonDetails && pokemonDetailsStatus === "ready" && (
        <div className={`mt-4 rounded-xl border p-4 ${theme.profileCard}`}>
          <img
            src={getPokemonImage(pokemonDetails)}
            alt={prettify(pokemonDetails.name)}
            className="aspect-square w-full rounded-xl border border-white/20 object-cover"
          />
          <h3 className={`mt-3 text-xl font-semibold ${theme.profileTitle}`}>
            {prettify(pokemonDetails.name)}
          </h3>
          <ul className={`mt-2 grid gap-1.5 text-sm ${theme.profileText}`}>
            <li>
              Types:{" "}
              {pokemonDetails.types.map((item) => prettify(item.type.name)).join(", ")}
            </li>
            <li>
              Height: {pokemonDetails.height / 10} m
            </li>
            <li>
              Weight: {pokemonDetails.weight / 10} kg
            </li>
            <li>
              Base Power: {pokemonPower}
            </li>
          </ul>
        </div>
      )}
    </article>
  );
}
