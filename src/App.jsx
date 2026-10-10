import Navbar from "./components/Navbar";

import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useCallback, useState } from "react";

import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useFavourites from "./hooks/useFavourites";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const { characters, count, isLoading } = useCharacters(debouncedQuery);
  const [favourates, setFavourates] = useFavourites("Favourites", []);
  const [selectedId, setSelectedId] = useState(null);

  const closeDetail = useCallback(() => setSelectedId(null), []);

  // takes the full character object: indexing into `characters` by id
  // picked the wrong person whenever the list was filtered
  const addFavourateHandler = (character) => {
    setFavourates((prevFav) =>
      prevFav.some((item) => item.id === character.id)
        ? prevFav
        : [...prevFav, character]
    );
  };

  const deleteFavHandler = (id) => {
    setFavourates((prevFav) => prevFav.filter((item) => item.id !== id));
  };

  const isItExist = favourates.some((item) => item.id === selectedId);

  // covers both phases: waiting out the debounce, and the request itself
  const isSearching = query !== debouncedQuery || isLoading;

  return (
    <div className="app">
      <Toaster
        position="bottom-center"
        toastOptions={{ className: "toast" }}
      />
      <Navbar
        query={query}
        setQuery={setQuery}
        favourates={favourates}
        onDelete={deleteFavHandler}
        onSelect={setSelectedId}
      />
      <Main>
        <CharacterList
          characters={characters}
          count={count}
          query={debouncedQuery.trim()}
          isLoading={isSearching}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onClose={closeDetail}
          addToFav={addFavourateHandler}
          onRemoveFav={deleteFavHandler}
          isItExist={isItExist}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <main className="main">{children}</main>;
}
