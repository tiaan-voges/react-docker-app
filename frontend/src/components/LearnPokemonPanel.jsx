import { prettify } from "../utils/characterUtils";

import SearchableSelect from "./SearchableSelect";

export default function LearnPokemonPanel({
  pokemonTypeStatus,
  pokemonTypeError,
  pokemonTypes,
  selectedPokemonType,
  setSelectedPokemonType,
  pokemonByType,
  pokemonTypeDetailsStatus,
  theme,
}) {
  return (
    <section>
      <article
        className={`rounded-2xl border border-white/15 bg-gradient-to-b p-5 shadow-xl shadow-black/35 backdrop-blur-sm ${theme.learnPokemonPanel}`}
      >
        <h2 className={`font-serif text-2xl font-bold ${theme.panelTitle}`}>
          Learn More: Pokemon
        </h2>
        <p className={`mb-4 mt-2 text-sm ${theme.panelCopy}`}>
          Category: Pokemon by Type. Pick a type to browse matching Pokemon.
        </p>

        {pokemonTypeStatus === "error" ? (
          <p className={`mt-3 text-sm ${theme.error}`}>
            Could not load Pokemon types: {pokemonTypeError}
          </p>
        ) : (
          <SearchableSelect
            id="pokemon-type-select"
            label="Pokemon by Type"
            options={pokemonTypes.map((type) => ({
              value: type,
              label: prettify(type),
            }))}
            value={selectedPokemonType}
            onChange={setSelectedPokemonType}
            disabled={pokemonTypeStatus !== "ready"}
            placeholder="Search Pokemon type..."
            theme={theme}
          />
        )}

        {pokemonTypeDetailsStatus === "loading" && (
          <p className={`mt-3 text-sm ${theme.message}`}>
            Loading Pokemon for this type...
          </p>
        )}

        {pokemonTypeDetailsStatus === "error" && (
          <p className={`mt-3 text-sm ${theme.error}`}>
            Could not load Pokemon for this type: {pokemonTypeError}
          </p>
        )}

        {pokemonTypeDetailsStatus === "ready" && (
          <div className="mt-4">
            <p className={`mb-2 text-sm font-semibold ${theme.resultsHeading}`}>
              {prettify(selectedPokemonType)} Type Results ({pokemonByType.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pokemonByType.slice(0, 120).map((name) => (
                <span
                  key={name}
                  className={`rounded-full border px-2.5 py-1 text-xs ${theme.resultChip}`}
                >
                  {prettify(name)}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
