import Navbar from "./components/Navbar";

import "./App.css";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { useState } from "react";

import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useFavourites from "./hooks/useFavourites";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { characters, isLoading } = useCharacters(debouncedQuery);
  const [favourates, setFavourates] = useFavourites("Favourites", []);
  const [selectedId, setSelectedId] = useState();

  const selectHnadler = (id) => {
    setSelectedId(id);
  };

  const addFavourateHandler = async (id) => {
    setFavourates((prevFav) => [...prevFav, characters[id - 1]]);
  };

  const deleteFavHandler = (id) => {
    setFavourates((prevFav) => prevFav.filter((item) => item.id !== id));
  };

  const isItExist = favourates.map((item) => item.id).includes(selectedId);

  // covers both phases: waiting out the debounce, and the request itself
  const isSearching = query !== debouncedQuery || isLoading;

  return (
    <div className="app">
      <Toaster />
      <Navbar
        numOfResult={characters.length}
        query={query}
        setQuery={setQuery}
        favourates={favourates}
        onDelete={deleteFavHandler}
      />
      <Main characters={characters}>
        <CharacterList
          characters={characters}
          isLoading={isSearching}
          onSelect={selectHnadler}
        />
        <CharacterDetail
          selectedId={selectedId}
          addToFav={addFavourateHandler}
          isItExist={isItExist}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
