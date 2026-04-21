export function prettify(text = "") {
  return text
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

export function getPokemonImage(pokemon) {
  if (!pokemon) return "";
  return (
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    ""
  );
}

export function getWizardInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function normalizeHpCharacters(rawCharacters) {
  const seen = new Set();
  const normalized = [];

  for (const character of rawCharacters) {
    const name = character?.name?.trim();
    if (!name) continue;

    const id = name.toLowerCase();
    if (seen.has(id)) continue;
    seen.add(id);

    normalized.push({
      id,
      name,
      house: character.house || "Unknown",
      species: character.species || "Unknown",
      actor: character.actor || "Unknown",
      ancestry: character.ancestry || "Unknown",
      patronus: character.patronus || "None",
      alive: character.alive,
      wizard: character.wizard,
      image: character.image || "",
    });
  }

  normalized.sort((a, b) => a.name.localeCompare(b.name));
  return normalized;
}
