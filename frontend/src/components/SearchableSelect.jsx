import { useEffect, useMemo, useState } from "react";

export default function SearchableSelect({
  id,
  label,
  options,
  value,
  onChange,
  theme,
  disabled = false,
  placeholder = "Type to search...",
}) {
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) || null,
    [options, value],
  );
  const [query, setQuery] = useState(selectedOption?.label || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(selectedOption?.label || "");
  }, [selectedOption]);

  const visibleOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options.slice(0, 25);

    return options
      .filter((option) => option.label.toLowerCase().includes(normalizedQuery))
      .slice(0, 25);
  }, [options, query]);

  function handleInput(event) {
    setQuery(event.target.value);
    setIsOpen(true);
  }

  function handleBlur() {
    window.setTimeout(() => setIsOpen(false), 120);

    const normalizedQuery = query.trim().toLowerCase();
    const exactMatch = options.find(
      (option) => option.label.toLowerCase() === normalizedQuery,
    );

    if (exactMatch) {
      setQuery(exactMatch.label);
      if (exactMatch.value !== value) onChange(exactMatch.value);
      return;
    }

    setQuery(selectedOption?.label || "");
  }

  function handleKeyDown(event) {
    if (event.key !== "Enter") return;

    const normalizedQuery = query.trim().toLowerCase();
    const exactMatch = options.find(
      (option) => option.label.toLowerCase() === normalizedQuery,
    );
    if (!exactMatch) return;

    setQuery(exactMatch.label);
    if (exactMatch.value !== value) onChange(exactMatch.value);
    setIsOpen(false);
  }

  function handleSuggestionSelect(option) {
    setQuery(option.label);
    setIsOpen(false);
    if (option.value !== value) onChange(option.value);
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`mb-2 block text-sm font-semibold ${theme.inputLabel}`}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${theme.inputField} ${theme.inputFocus}`}
        value={query}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
      />

      {isOpen && !disabled && visibleOptions.length > 0 && (
        <ul
          className={`absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl border p-1 shadow-xl shadow-black/35 ${theme.suggestions}`}
          role="listbox"
          aria-label={label}
        >
          {visibleOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  option.value === value
                    ? `w-full rounded-lg border px-2.5 py-2 text-left text-sm transition ${theme.suggestionActive}`
                    : `w-full rounded-lg border border-transparent bg-transparent px-2.5 py-2 text-left text-sm transition ${theme.suggestionIdle} ${theme.suggestionHover}`
                }
                onMouseDown={() => handleSuggestionSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
