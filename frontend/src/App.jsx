import { useMemo } from "react";

import HeroHeader from "./components/HeroHeader";
import PokemonPanel from "./components/PokemonPanel";
import VersusPanel from "./components/VersusPanel";
import WizardPanel from "./components/WizardPanel";
import { usePokemonData } from "./hooks/usePokemonData";
import { useWizardData } from "./hooks/useWizardData";

export default function App() {
  const {
    pokemonList,
    selectedPokemon,
    setSelectedPokemon,
    pokemonDetails,
    pokemonListStatus,
    pokemonDetailsStatus,
    pokemonError,
    pokemonSpotlightChoices,
    pokemonPower,
  } = usePokemonData();

  const {
    hpCharacters,
    selectedHpId,
    setSelectedHpId,
    hpStatus,
    hpError,
    selectedWizard,
    wizardSpotlightChoices,
    wizardPower,
  } = useWizardData();

  const winnerText = useMemo(() => {
    if (!pokemonPower || !wizardPower) return "Choose both fighters to begin.";
    if (pokemonPower === wizardPower) return "Draw. This duel needs a rematch.";
    return pokemonPower > wizardPower
      ? "Pokemon edge ahead on raw battle stats."
      : "Wizard claims advantage through magical traits.";
  }, [pokemonPower, wizardPower]);

  return (
    <main className="app-shell">
      <HeroHeader />

      <section className="arena-grid">
        <PokemonPanel
          pokemonListStatus={pokemonListStatus}
          pokemonError={pokemonError}
          pokemonList={pokemonList}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          pokemonSpotlightChoices={pokemonSpotlightChoices}
          pokemonDetailsStatus={pokemonDetailsStatus}
          pokemonDetails={pokemonDetails}
          pokemonPower={pokemonPower}
        />

        <VersusPanel
          pokemonPower={pokemonPower}
          wizardPower={wizardPower}
          winnerText={winnerText}
        />

        <WizardPanel
          hpStatus={hpStatus}
          hpError={hpError}
          hpCharacters={hpCharacters}
          selectedHpId={selectedHpId}
          setSelectedHpId={setSelectedHpId}
          wizardSpotlightChoices={wizardSpotlightChoices}
          selectedWizard={selectedWizard}
        />
      </section>
    </main>
  );
}
