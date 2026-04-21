export default function MainMenu({
  activeView,
  setActiveView,
  wizardLearnCategory,
  setWizardLearnCategory,
  wizardHouseMenuEnabled,
  theme,
  themes,
  activeThemeId,
  setActiveThemeId,
}) {
  const menuTitleBase =
    "w-full rounded-lg border px-3 py-2 text-sm font-semibold transition";
  const submenuBase =
    "rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-45";
  const themeBtnBase = "rounded-full border px-2.5 py-1 text-xs transition";

  return (
    <nav
      className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-3"
      aria-label="Main menu"
    >
      <div className={`rounded-xl border p-2.5 ${theme.menuGroup}`}>
        <button
          type="button"
          className={`${menuTitleBase} ${
            activeView === "arena" ? theme.menuTitleActive : theme.menuTitleIdle
          }`}
          onClick={() => setActiveView("arena")}
        >
          Battle Arena
        </button>
      </div>

      <div className={`rounded-xl border p-2.5 ${theme.menuGroup}`}>
        <button
          type="button"
          className={`${menuTitleBase} ${
            activeView === "learn-pokemon"
              ? theme.menuTitleActive
              : theme.menuTitleIdle
          }`}
          onClick={() => setActiveView("learn-pokemon")}
        >
          Learn More: Pokemon
        </button>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            className={`${submenuBase} ${
              activeView === "learn-pokemon"
                ? theme.submenuActive
                : theme.submenuIdle
            }`}
            onClick={() => setActiveView("learn-pokemon")}
          >
            Pokemon by Type
          </button>
        </div>
      </div>

      <div className={`rounded-xl border p-2.5 ${theme.menuGroup}`}>
        <button
          type="button"
          className={`${menuTitleBase} ${
            activeView === "learn-wizards"
              ? theme.menuTitleActive
              : theme.menuTitleIdle
          }`}
          onClick={() => setActiveView("learn-wizards")}
        >
          Learn More: Wizards
        </button>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            type="button"
            className={`${submenuBase} ${
              activeView === "learn-wizards" && wizardLearnCategory === "race"
                ? theme.submenuActive
                : theme.submenuIdle
            }`}
            onClick={() => {
              setActiveView("learn-wizards");
              setWizardLearnCategory("race");
            }}
          >
            Wizards by Race
          </button>
          <button
            type="button"
            className={`${submenuBase} ${
              activeView === "learn-wizards" && wizardLearnCategory === "house"
                ? theme.submenuActive
                : theme.submenuIdle
            }`}
            onClick={() => {
              setActiveView("learn-wizards");
              setWizardLearnCategory("house");
            }}
            disabled={!wizardHouseMenuEnabled}
          >
            Wizards by House
          </button>
        </div>
      </div>

      <div className={`rounded-xl border p-2.5 md:col-span-3 ${theme.menuGroup}`}>
        <p className={`mb-2 text-xs font-semibold uppercase tracking-wider ${theme.panelCopy}`}>
          Theme
        </p>
        <div className="flex flex-wrap gap-1.5">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              type="button"
              className={`${themeBtnBase} ${
                activeThemeId === themeOption.id
                  ? theme.submenuActive
                  : theme.submenuIdle
              }`}
              onClick={() => setActiveThemeId(themeOption.id)}
            >
              {themeOption.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
