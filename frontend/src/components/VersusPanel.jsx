export default function VersusPanel({ pokemonPower, wizardPower, winnerText }) {
  return (
    <article className="versus-panel">
      <span className="versus-badge">VS</span>
      <div className="score-row">
        <div className="score-box">
          <p className="score-label">Pokemon Power</p>
          <p className="score-value">{pokemonPower || "-"}</p>
        </div>
        <div className="score-box">
          <p className="score-label">Wizard Power</p>
          <p className="score-value">{wizardPower || "-"}</p>
        </div>
      </div>
      <p className="winner-text">{winnerText}</p>
      <p className="sources">
        Data:{" "}
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          PokeAPI
        </a>{" "}
        and{" "}
        <a href="https://hp-api.onrender.com/" target="_blank" rel="noreferrer">
          HP API
        </a>
      </p>
    </article>
  );
}
