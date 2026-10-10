import Character from "./Character";

function CharacterList({
  characters,
  count,
  query,
  isLoading,
  selectedId,
  onSelect,
}) {
  const isFirstLoad = isLoading && !characters.length;
  const isEmpty = !isLoading && !characters.length;

  return (
    <section className="results" aria-labelledby="results-summary">
      <h2 id="results-summary" className="results__summary" aria-live="polite">
        {isLoading && <span className="spinner" aria-hidden="true" />}
        {isLoading
          ? "Searching…"
          : isEmpty
          ? "No matches"
          : query
          ? `${count} ${count === 1 ? "match" : "matches"} for “${query}”`
          : `${count} characters`}
      </h2>
      {!isLoading && count > characters.length && (
        <p className="results__hint">
          Showing the first {characters.length}.{" "}
          {query ? "Add more letters to narrow it down." : "Search by name to find anyone else."}
        </p>
      )}

      {isFirstLoad ? (
        <ListSkeleton />
      ) : isEmpty ? (
        <div className="empty">
          {query ? (
            <>
              <strong>Nobody called “{query}” in this dimension.</strong>
              Check the spelling, or try just part of the name.
            </>
          ) : (
            <>
              <strong>Characters didn’t load.</strong>
              Check your connection, then reload the page.
            </>
          )}
        </div>
      ) : (
        <ul className={`list ${isLoading ? "is-stale" : ""}`}>
          {characters.map((item) => (
            <Character
              key={item.id}
              item={item}
              onSelect={onSelect}
              isSelected={item.id === selectedId}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CharacterList;

function ListSkeleton() {
  return (
    <div aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <div className="skeleton-row" key={i}>
          <div className="skeleton" />
          <div className="skeleton-lines">
            <div className="skeleton skeleton--line" style={{ width: "60%" }} />
            <div className="skeleton skeleton--line" style={{ width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
