import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import Character from "./Character";

function Navbar({ numOfResult, query, setQuery, favourates, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Modal title="List of your interests :)" open={isOpen} onOpen={setIsOpen}>
        {favourates.map((item) => {
          return (
            <Character key={item.id} item={item} onSelect={() => {}}>
              <button className="icon red" onClick={() => onDelete(item.id)}>
                <TrashIcon />
              </button>
            </Character>
          );
        })}
      </Modal>
      <div className="navbar__logo">Logo</div>
      <Search query={query} setQuery={setQuery} />
      <div className="navbar__result">Found {numOfResult} characters</div>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourates.length}</span>
      </button>
    </nav>
  );
}

export default Navbar;

function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="text-field"
      placeholder="search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
