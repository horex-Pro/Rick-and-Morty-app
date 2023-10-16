import { EyeIcon } from "@heroicons/react/24/outline";

function Character({ item, onSelect, children }) {
  return (
    <div className="list__item" onClick={() => onSelect(item.id)}>
      <img src={item.image} alt={item.name} />
      <CharcterName item={item} />
      <CharacterInfo item={item} />
      {children}
    </div>
  );
}

export default Character;

function CharcterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👱‍♀️"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>{item.status}</span>
      <span>-{item.species}</span>
    </div>
  );
}
