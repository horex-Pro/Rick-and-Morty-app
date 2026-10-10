function Character({ item, onSelect, isSelected = false, children }) {
  return (
    <li className={`list__item ${isSelected ? "is-selected" : ""}`}>
      <button
        type="button"
        className="list__item-main"
        onClick={() => onSelect(item.id)}
        aria-current={isSelected ? "true" : undefined}
      >
        <img
          src={item.image}
          alt=""
          width="56"
          height="56"
          loading="lazy"
          decoding="async"
        />
        <span className="list__item-text">
          <span className="name">{item.name}</span>
          <CharacterInfo item={item} />
        </span>
      </button>
      {children}
    </li>
  );
}

export default Character;

export function Status({ status }) {
  return (
    <span className="status" data-status={status.toLowerCase()}>
      {status === "unknown" ? "Status unknown" : status}
    </span>
  );
}

function CharacterInfo({ item }) {
  return (
    <span className="info">
      <Status status={item.status} />
      <span>{item.species}</span>
    </span>
  );
}
