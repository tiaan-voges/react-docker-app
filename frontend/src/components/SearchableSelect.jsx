import { useEffect, useMemo, useState } from "react";

export default function SearchableSelect({
  id,
  label,
  options,
  value,
  onChange,
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
    <div className="searchable-select">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className="searchable-input"
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
        <ul className="search-suggestions" role="listbox" aria-label={label}>
          {visibleOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  option.value === value
                    ? "search-suggestion active"
                    : "search-suggestion"
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
