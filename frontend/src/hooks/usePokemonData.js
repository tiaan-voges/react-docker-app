import { useEffect, useMemo, useState } from "react";

import {
  POKEMON_DETAILS_URL,
  POKEMON_LIST_URL,
  POKEMON_SPOTLIGHT,
  POKEMON_TYPE_URL,
} from "../constants/dataSources";

export function usePokemonData() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokemonListStatus, setPokemonListStatus] = useState("loading");
  const [pokemonDetailsStatus, setPokemonDetailsStatus] = useState("idle");
  const [pokemonError, setPokemonError] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [pokemonByType, setPokemonByType] = useState([]);
  const [pokemonTypeStatus, setPokemonTypeStatus] = useState("loading");
  const [pokemonTypeDetailsStatus, setPokemonTypeDetailsStatus] = useState("idle");
  const [pokemonTypeError, setPokemonTypeError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPokemonList() {
      try {
        setPokemonListStatus("loading");
        setPokemonError("");

        const response = await fetch(POKEMON_LIST_URL);
        if (!response.ok) {
          throw new Error(`Pokemon list failed with status ${response.status}`);
        }

        const data = await response.json();
        if (ignore) return;

        const names = (data.results || []).map((item) => item.name);
        setPokemonList(names);
        setPokemonListStatus("ready");

        const defaultChoice = names.includes("pikachu")
          ? "pikachu"
          : names[0] || "";
        setSelectedPokemon(defaultChoice);
      } catch (error) {
        if (ignore) return;
        setPokemonError(error.message);
        setPokemonListStatus("error");
      }
    }

    loadPokemonList();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedPokemon) return;
    let ignore = false;

    async function loadPokemonDetails() {
      try {
        setPokemonDetailsStatus("loading");
        setPokemonError("");

        const response = await fetch(`${POKEMON_DETAILS_URL}${selectedPokemon}`);
        if (!response.ok) {
          throw new Error(
            `Pokemon details failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        if (ignore) return;

        setPokemonDetails(data);
        setPokemonDetailsStatus("ready");
      } catch (error) {
        if (ignore) return;
        setPokemonError(error.message);
        setPokemonDetailsStatus("error");
      }
    }

    loadPokemonDetails();

    return () => {
      ignore = true;
    };
  }, [selectedPokemon]);

  useEffect(() => {
    let ignore = false;

    async function loadPokemonTypes() {
      try {
        setPokemonTypeStatus("loading");
        setPokemonTypeError("");

        const response = await fetch(POKEMON_TYPE_URL);
        if (!response.ok) {
          throw new Error(`Pokemon types failed with status ${response.status}`);
        }

        const data = await response.json();
        if (ignore) return;

        const filteredTypes = (data.results || [])
          .map((item) => item.name)
          .filter((name) => name !== "shadow" && name !== "unknown");

        setPokemonTypes(filteredTypes);
        setPokemonTypeStatus("ready");
        setSelectedPokemonType(
          filteredTypes.includes("fire") ? "fire" : (filteredTypes[0] ?? ""),
        );
      } catch (error) {
        if (ignore) return;
        setPokemonTypeError(error.message);
        setPokemonTypeStatus("error");
      }
    }

    loadPokemonTypes();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedPokemonType) return;
    let ignore = false;

    async function loadPokemonByType() {
      try {
        setPokemonTypeDetailsStatus("loading");
        setPokemonTypeError("");

        const response = await fetch(`${POKEMON_TYPE_URL}${selectedPokemonType}`);
        if (!response.ok) {
          throw new Error(
            `Pokemon by type failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        if (ignore) return;

        const names = (data.pokemon || []).map((entry) => entry.pokemon.name);
        setPokemonByType(names);
        setPokemonTypeDetailsStatus("ready");
      } catch (error) {
        if (ignore) return;
        setPokemonTypeError(error.message);
        setPokemonTypeDetailsStatus("error");
      }
    }

    loadPokemonByType();

    return () => {
      ignore = true;
    };
  }, [selectedPokemonType]);

  const pokemonSpotlightChoices = useMemo(
    () => POKEMON_SPOTLIGHT.filter((name) => pokemonList.includes(name)),
    [pokemonList],
  );

  const pokemonPower = useMemo(() => {
    if (!pokemonDetails?.stats) return 0;
    return pokemonDetails.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  }, [pokemonDetails]);

  return {
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
  };
}
