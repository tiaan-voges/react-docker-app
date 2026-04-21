import SearchableSelect from "./SearchableSelect";

export default function LearnWizardsPanel({
  hpStatus,
  hpError,
  wizardLearnCategory,
  wizardRaceOptions,
  selectedWizardRace,
  setSelectedWizardRace,
  wizardHouseOptions,
  selectedWizardHouse,
  setSelectedWizardHouse,
  wizardsByRace,
  wizardsByRaceAndHouse,
  theme,
}) {
  const showHouseMenu = wizardHouseOptions.length > 0;
  const shouldFilterByHouse = wizardLearnCategory === "house" && showHouseMenu;
  const results = shouldFilterByHouse ? wizardsByRaceAndHouse : wizardsByRace;

  return (
    <section>
      <article
        className={`rounded-2xl border border-white/15 bg-gradient-to-b p-5 shadow-xl shadow-black/35 backdrop-blur-sm ${theme.learnWizardPanel}`}
      >
        <h2 className={`font-serif text-2xl font-bold ${theme.panelTitle}`}>
          Learn More: Wizards
        </h2>
        <p className={`mb-4 mt-2 text-sm ${theme.panelCopy}`}>
          Category: {wizardLearnCategory === "house" ? "Wizards by House" : "Wizards by Race"}
          . Choose a race, then refine by house when available.
        </p>

        {hpStatus === "error" ? (
          <p className={`mt-3 text-sm ${theme.error}`}>
            Could not load Wizarding World data: {hpError}
          </p>
        ) : (
          <>
            <SearchableSelect
              id="wizard-race-select"
              label="Wizards by Race"
              options={wizardRaceOptions.map((race) => ({
                value: race,
                label: race,
              }))}
              value={selectedWizardRace}
              onChange={setSelectedWizardRace}
              disabled={hpStatus !== "ready"}
              placeholder="Search wizard race..."
              theme={theme}
            />

            {showHouseMenu ? (
              <SearchableSelect
                id="wizard-house-select"
                label="House Submenu"
                options={wizardHouseOptions.map((house) => ({
                  value: house,
                  label: house,
                }))}
                value={selectedWizardHouse}
                onChange={setSelectedWizardHouse}
                disabled={hpStatus !== "ready" || wizardLearnCategory !== "house"}
                placeholder="Search house..."
                theme={theme}
              />
            ) : (
              <p className={`mt-3 text-sm ${theme.message}`}>
                No house submenu for this race. Choose a different race to filter by
                house.
              </p>
            )}
          </>
        )}

        {hpStatus === "ready" && (
          <div className="mt-4">
            <p className={`mb-2 text-sm font-semibold ${theme.resultsHeading}`}>
              Results ({results.length})
              {selectedWizardRace ? ` for race: ${selectedWizardRace}` : ""}
              {shouldFilterByHouse && selectedWizardHouse
                ? `, house: ${selectedWizardHouse}`
                : ""}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {results.slice(0, 160).map((character) => (
                <span
                  key={character.id}
                  className={`rounded-full border px-2.5 py-1 text-xs ${theme.resultChip}`}
                >
                  {character.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
