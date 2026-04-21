import { useEffect, useMemo, useState } from "react";

import { HP_CHARACTERS_URL, HP_SPOTLIGHT } from "../constants/dataSources";
import { normalizeHpCharacters } from "../utils/characterUtils";

export function useWizardData() {
  const [hpCharacters, setHpCharacters] = useState([]);
  const [selectedHpId, setSelectedHpId] = useState("");
  const [hpStatus, setHpStatus] = useState("loading");
  const [hpError, setHpError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadHpCharacters() {
      try {
        setHpStatus("loading");
        setHpError("");

        const response = await fetch(HP_CHARACTERS_URL);
        if (!response.ok) {
          throw new Error(
            `Wizarding World list failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        if (ignore) return;

        const characters = normalizeHpCharacters(data || []);
        setHpCharacters(characters);
        setHpStatus("ready");

        const preferredCharacter = characters.find(
          (character) => character.name === "Harry Potter",
        );
        setSelectedHpId(preferredCharacter?.id || characters[0]?.id || "");
      } catch (error) {
        if (ignore) return;
        setHpError(error.message);
        setHpStatus("error");
      }
    }

    loadHpCharacters();

    return () => {
      ignore = true;
    };
  }, []);

  const selectedWizard = useMemo(
    () => hpCharacters.find((character) => character.id === selectedHpId) || null,
    [hpCharacters, selectedHpId],
  );

  const wizardSpotlightChoices = useMemo(() => {
    const spotlight = HP_SPOTLIGHT.map((name) =>
      hpCharacters.find((character) => character.name === name),
    ).filter(Boolean);

    return spotlight.length > 0 ? spotlight : hpCharacters.slice(0, 6);
  }, [hpCharacters]);

  const wizardPower = useMemo(() => {
    if (!selectedWizard) return 0;

    let score = 45;
    if (selectedWizard.wizard) score += 20;
    if (selectedWizard.house !== "Unknown") score += 10;
    if (selectedWizard.patronus !== "None") score += 10;
    if (selectedWizard.alive) score += 5;
    if (selectedWizard.species.toLowerCase() !== "human") score += 7;
    return score;
  }, [selectedWizard]);

  return {
    hpCharacters,
    selectedHpId,
    setSelectedHpId,
    hpStatus,
    hpError,
    selectedWizard,
    wizardSpotlightChoices,
    wizardPower,
  };
}
