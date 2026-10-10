import {
  HeartIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import Character from "./Character";
import ThemeToggle from "./ThemeToggle";

function Navbar({ query, setQuery, favourates, onDelete, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const openFavourite = (id) => {
    setIsOpen(false);
    onSelect(id);
  };

  return (
    <header className="navbar">
      <a className="brand" href="/">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">
          Rick and Morty
          <span className="brand__sub">Character finder</span>
        </span>
      </a>
      <Search query={query} setQuery={setQuery} />
      <div className="navbar__actions">
        <button
          className="icon-btn fav-btn"
          onClick={() => setIsOpen(true)}
          aria-label={`Favourites, ${favourates.length} saved`}
        >
          <HeartIcon className="icon" />
          {favourates.length > 0 && (
            <span className="badge" key={favourates.length}>
              {favourates.length}
            </span>
          )}
        </button>
        <ThemeToggle />
      </div>

      <Modal title="Favourites" open={isOpen} onOpen={setIsOpen}>
        {favourates.length ? (
          <ul className="list">
            {favourates.map((item) => (
              <Character key={item.id} item={item} onSelect={openFavourite}>
                <button
                  className="icon-btn icon-btn--danger"
                  onClick={() => onDelete(item.id)}
                  aria-label={`Remove ${item.name} from favourites`}
                >
                  <TrashIcon className="icon" />
                </button>
              </Character>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <strong>No favourites yet.</strong>
            Open a character and choose Add to favourites to keep them here.
          </div>
        )}
      </Modal>
    </header>
  );
}

export default Navbar;

function Search({ query, setQuery }) {
  return (
    <div className="search" role="search">
      <MagnifyingGlassIcon className="icon search__icon" aria-hidden="true" />
      <input
        type="search"
        className="text-field"
        placeholder="Search by name, e.g. Squanchy"
        aria-label="Search characters by name"
        autoComplete="off"
        spellCheck="false"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
