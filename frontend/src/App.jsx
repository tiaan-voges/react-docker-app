import { useEffect, useMemo, useState } from "react";

import HeroHeader from "./components/HeroHeader";
import LearnPokemonPanel from "./components/LearnPokemonPanel";
import LearnWizardsPanel from "./components/LearnWizardsPanel";
import MainMenu from "./components/MainMenu";
import PokemonPanel from "./components/PokemonPanel";
import VersusPanel from "./components/VersusPanel";
import WizardPanel from "./components/WizardPanel";
import { usePokemonData } from "./hooks/usePokemonData";
import { useWizardData } from "./hooks/useWizardData";
import { DEFAULT_THEME_ID, THEMES } from "./theme/themes";

export default function App() {
  const [activeView, setActiveView] = useState("arena");
  const [wizardLearnCategory, setWizardLearnCategory] = useState("race");
  const [activeThemeId, setActiveThemeId] = useState(DEFAULT_THEME_ID);

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
    pokemonTypes,
    selectedPokemonType,
    setSelectedPokemonType,
    pokemonByType,
    pokemonTypeStatus,
    pokemonTypeDetailsStatus,
    pokemonTypeError,
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
    wizardRaceOptions,
    selectedWizardRace,
    setSelectedWizardRace,
    wizardHouseOptions,
    selectedWizardHouse,
    setSelectedWizardHouse,
    wizardsByRace,
    wizardsByRaceAndHouse,
  } = useWizardData();

  const winnerText = useMemo(() => {
    if (!pokemonPower || !wizardPower) return "Choose both fighters to begin.";
    if (pokemonPower === wizardPower) return "Draw. This duel needs a rematch.";
    return pokemonPower > wizardPower
      ? "Pokemon edge ahead on raw battle stats."
      : "Wizard claims advantage through magical traits.";
  }, [pokemonPower, wizardPower]);

  useEffect(() => {
    if (wizardLearnCategory === "house" && wizardHouseOptions.length === 0) {
      setWizardLearnCategory("race");
    }
  }, [wizardHouseOptions, wizardLearnCategory]);

  const activeTheme = useMemo(
    () => THEMES.find((theme) => theme.id === activeThemeId) || THEMES[0],
    [activeThemeId],
  );

  return (
    <main
      className={`animate-bg-shift min-h-screen overflow-hidden bg-[length:220%_220%] px-4 py-10 sm:px-6 ${activeTheme.appBg} ${activeTheme.appText}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <HeroHeader theme={activeTheme} />
        <MainMenu
          activeView={activeView}
          setActiveView={setActiveView}
          wizardLearnCategory={wizardLearnCategory}
          setWizardLearnCategory={setWizardLearnCategory}
          wizardHouseMenuEnabled={wizardHouseOptions.length > 0}
          theme={activeTheme}
          themes={THEMES}
          activeThemeId={activeThemeId}
          setActiveThemeId={setActiveThemeId}
        />

        {activeView === "arena" && (
          <section className="grid items-start gap-4 lg:grid-cols-[1fr_280px_1fr]">
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
              theme={activeTheme}
            />

            <VersusPanel
              pokemonPower={pokemonPower}
              wizardPower={wizardPower}
              winnerText={winnerText}
              theme={activeTheme}
            />

            <WizardPanel
              hpStatus={hpStatus}
              hpError={hpError}
              hpCharacters={hpCharacters}
              selectedHpId={selectedHpId}
              setSelectedHpId={setSelectedHpId}
              wizardSpotlightChoices={wizardSpotlightChoices}
              selectedWizard={selectedWizard}
              theme={activeTheme}
            />
          </section>
        )}

        {activeView === "learn-pokemon" && (
          <LearnPokemonPanel
            pokemonTypeStatus={pokemonTypeStatus}
            pokemonTypeError={pokemonTypeError}
            pokemonTypes={pokemonTypes}
            selectedPokemonType={selectedPokemonType}
            setSelectedPokemonType={setSelectedPokemonType}
            pokemonByType={pokemonByType}
            pokemonTypeDetailsStatus={pokemonTypeDetailsStatus}
            theme={activeTheme}
          />
        )}

        {activeView === "learn-wizards" && (
          <LearnWizardsPanel
            hpStatus={hpStatus}
            hpError={hpError}
            wizardLearnCategory={wizardLearnCategory}
            wizardRaceOptions={wizardRaceOptions}
            selectedWizardRace={selectedWizardRace}
            setSelectedWizardRace={setSelectedWizardRace}
            wizardHouseOptions={wizardHouseOptions}
            selectedWizardHouse={selectedWizardHouse}
            setSelectedWizardHouse={setSelectedWizardHouse}
            wizardsByRace={wizardsByRace}
            wizardsByRaceAndHouse={wizardsByRaceAndHouse}
            theme={activeTheme}
          />
        )}
      </div>
    </main>
  );
}
