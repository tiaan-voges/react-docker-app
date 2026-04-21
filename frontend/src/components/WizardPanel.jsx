import { getWizardInitials } from "../utils/characterUtils";

import SearchableSelect from "./SearchableSelect";

export default function WizardPanel({
  hpStatus,
  hpError,
  hpCharacters,
  selectedHpId,
  setSelectedHpId,
  wizardSpotlightChoices,
  selectedWizard,
  theme,
}) {
  const chipBase =
    "rounded-full border px-3 py-1.5 text-xs transition sm:text-sm";

  return (
    <article
      className={`rounded-2xl border border-white/15 bg-gradient-to-b p-5 shadow-xl shadow-black/35 backdrop-blur-sm ${theme.wizardPanel}`}
    >
      <h2 className={`font-serif text-xl font-bold ${theme.panelTitle}`}>
        Wizarding World Menu
      </h2>
      <p className={`mb-4 mt-2 text-sm ${theme.panelCopy}`}>
        Browse characters from the Wizarding World.
      </p>

      {hpStatus === "error" ? (
        <p className={`mt-3 text-sm ${theme.error}`}>
          Could not load Wizarding World data: {hpError}
        </p>
      ) : (
        <>
          <SearchableSelect
            id="wizard-select"
            label="Choose a character"
            options={hpCharacters.map((character) => ({
              value: character.id,
              label: character.name,
            }))}
            value={selectedHpId}
            onChange={setSelectedHpId}
            disabled={hpStatus !== "ready"}
            placeholder="Search characters..."
            theme={theme}
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {wizardSpotlightChoices.map((character) => (
              <button
                key={character.id}
                type="button"
                className={`${chipBase} ${
                  selectedHpId === character.id
                    ? theme.chipActive
                    : theme.chipIdle
                }`}
                onClick={() => setSelectedHpId(character.id)}
              >
                {character.name}
              </button>
            ))}
          </div>
        </>
      )}

      {hpStatus === "loading" && (
        <p className={`mt-3 text-sm ${theme.message}`}>Loading wizard profiles...</p>
      )}

      {selectedWizard && hpStatus === "ready" && (
        <div className={`mt-4 rounded-xl border p-4 ${theme.profileCard}`}>
          {selectedWizard.image ? (
            <img
              src={selectedWizard.image}
              alt={selectedWizard.name}
              className="aspect-square w-full rounded-xl border border-white/20 object-cover"
            />
          ) : (
            <div
              className={`grid aspect-square w-full place-items-center rounded-xl border border-white/20 bg-gradient-to-br ${theme.profileFallback}`}
            >
              <span
                className={`font-serif text-4xl font-bold sm:text-5xl ${theme.profileFallbackText}`}
              >
                {getWizardInitials(selectedWizard.name)}
              </span>
            </div>
          )}
          <h3 className={`mt-3 text-xl font-semibold ${theme.profileTitle}`}>
            {selectedWizard.name}
          </h3>
          <ul className={`mt-2 grid gap-1.5 text-sm ${theme.profileText}`}>
            <li>House: {selectedWizard.house}</li>
            <li>Species: {selectedWizard.species}</li>
            <li>Patronus: {selectedWizard.patronus}</li>
            <li>Actor: {selectedWizard.actor}</li>
          </ul>
        </div>
      )}
    </article>
  );
}
