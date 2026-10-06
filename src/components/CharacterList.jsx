import { EyeIcon } from "@heroicons/react/24/outline";
import Character from "./Character";

function CharacterList({ characters, isLoading, onSelect }) {
  if (isLoading) return <div className="loader">Searching...</div>;

  if (!characters.length)
    return <div className="loader">No character found :(</div>;

  return (
    <div className="characters-list">
      {characters.map((item) => {
        return (
          <Character key={item.id} item={item} onSelect={onSelect}>
            <button className="icon red">
              <EyeIcon />
            </button>
          </Character>
        );
      })}
    </div>
  );
}

export default CharacterList;
