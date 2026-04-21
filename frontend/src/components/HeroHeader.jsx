export default function HeroHeader({ theme }) {
  return (
    <header className="mb-8 text-center">
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-[0.16em] ${theme.heroEyebrow}`}
      >
        Public API Crossover
      </p>
      <h1
        className={`font-serif text-4xl font-black tracking-wide sm:text-5xl lg:text-6xl ${theme.heroTitle}`}
      >
        Pokemon vs Wizarding World
      </h1>
      <p className={`mx-auto mt-4 max-w-3xl text-sm sm:text-base ${theme.heroSubtitle}`}>
        Use the main menu for Battle Arena or Learn More sections with
        categories and submenus.
      </p>
    </header>
  );
}
