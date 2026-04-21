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
}) {
  return (
    <article className="panel wizard-panel">
      <h2>Wizarding World Menu</h2>
      <p className="panel-copy">Browse characters from the Wizarding World.</p>

      {hpStatus === "error" ? (
        <p className="message error">Could not load Wizarding World data: {hpError}</p>
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
          />

          <div className="chip-menu">
            {wizardSpotlightChoices.map((character) => (
              <button
                key={character.id}
                type="button"
                className={selectedHpId === character.id ? "chip active" : "chip"}
                onClick={() => setSelectedHpId(character.id)}
              >
                {character.name}
              </button>
            ))}
          </div>
        </>
      )}

      {hpStatus === "loading" && <p className="message">Loading wizard profiles...</p>}

      {selectedWizard && hpStatus === "ready" && (
        <div className="profile-card">
          {selectedWizard.image ? (
            <img
              src={selectedWizard.image}
              alt={selectedWizard.name}
              className="portrait"
            />
          ) : (
            <div className="portrait placeholder">
              <span>{getWizardInitials(selectedWizard.name)}</span>
            </div>
          )}
          <h3>{selectedWizard.name}</h3>
          <ul className="stats-list">
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
