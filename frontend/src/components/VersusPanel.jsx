export default function VersusPanel({
  pokemonPower,
  wizardPower,
  winnerText,
  theme,
}) {
  return (
    <article
      className={`grid gap-4 rounded-2xl border border-white/15 p-5 shadow-xl shadow-black/35 backdrop-blur-sm ${theme.vsPanel}`}
    >
      <span
        className={`mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full font-serif text-xl font-black tracking-widest ${theme.vsBadge}`}
      >
        VS
      </span>
      <div className="grid gap-2.5">
        <div className={`rounded-xl border p-3 ${theme.scoreBox}`}>
          <p className={`text-xs uppercase tracking-widest ${theme.scoreLabel}`}>
            Pokemon Power
          </p>
          <p className="mt-1 text-3xl font-extrabold">{pokemonPower || "-"}</p>
        </div>
        <div className={`rounded-xl border p-3 ${theme.scoreBox}`}>
          <p className={`text-xs uppercase tracking-widest ${theme.scoreLabel}`}>
            Wizard Power
          </p>
          <p className="mt-1 text-3xl font-extrabold">{wizardPower || "-"}</p>
        </div>
      </div>
      <p className={`text-sm ${theme.winnerText}`}>{winnerText}</p>
      <p className={`text-xs ${theme.sourceText}`}>
        Data:{" "}
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          className={`${theme.link} underline-offset-2 hover:underline`}
        >
          PokeAPI
        </a>{" "}
        and{" "}
        <a
          href="https://hp-api.onrender.com/"
          target="_blank"
          rel="noreferrer"
          className={`${theme.link} underline-offset-2 hover:underline`}
        >
          HP API
        </a>
      </p>
    </article>
  );
}
