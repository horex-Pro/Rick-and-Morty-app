import axios from "axios";
import {
  ArrowLeftIcon,
  ArrowsUpDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Status } from "./Character";

const API = "https://rickandmortyapi.com/api";

// characters don't change, so revisiting one is instant instead of a refetch
const cache = new Map();

const SHEET_QUERY = "(max-width: 899px)";

function CharacterDetail({
  selectedId,
  onClose,
  addToFav,
  onRemoveFav,
  isItExist,
}) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [retry, setRetry] = useState(0);
  const isOpen = selectedId != null;

  useEffect(() => {
    if (selectedId == null) return;

    if (cache.has(selectedId)) {
      setData(cache.get(selectedId));
      setStatus("ready");
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function getCharacter() {
      try {
        setStatus("loading");
        const { data: character } = await axios.get(
          `${API}/character/${selectedId}`,
          { signal }
        );

        const episodesId = character.episode.map((item) =>
          item.split("/").pop()
        );
        const { data: episodes } = await axios.get(
          `${API}/episode/${episodesId.join(",")}`,
          { signal }
        );

        // a single id comes back as an object rather than an array
        const value = {
          character,
          episodes: Array.isArray(episodes) ? episodes : [episodes],
        };
        cache.set(selectedId, value);
        setData(value);
        setStatus("ready");
      } catch (error) {
        if (axios.isCancel(error)) return;
        setStatus("error");
      }
    }
    getCharacter();

    return () => controller.abort();
  }, [selectedId, retry]);

  // on small screens the pane is a full-screen sheet: lock the page behind
  // it and let Escape close it
  useEffect(() => {
    if (!isOpen || !window.matchMedia(SHEET_QUERY).matches) return;

    const root = document.documentElement;
    root.classList.add("is-locked");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      root.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  let content;
  if (!isOpen && !data) {
    content = <Placeholder />;
  } else if (!isOpen) {
    // the sheet is sliding away: keep the last character on screen
    // rather than flashing the placeholder mid-animation
    content = (
      <CharacterSubDetail
        character={data.character}
        isItExist={isItExist}
        addToFav={addToFav}
        onRemoveFav={onRemoveFav}
      />
    );
  } else if (status === "error") {
    content = (
      <div className="detail__placeholder" role="alert">
        <p>This character didn’t load. Check your connection and try again.</p>
        <button
          className="btn btn--secondary"
          onClick={() => setRetry((n) => n + 1)}
        >
          Try again
        </button>
      </div>
    );
  } else if (status !== "ready" || data?.character.id !== selectedId) {
    content = <DetailSkeleton />;
  } else {
    content = (
      <>
        <CharacterSubDetail
          character={data.character}
          isItExist={isItExist}
          addToFav={addToFav}
          onRemoveFav={onRemoveFav}
        />
        <Episodes episodes={data.episodes} />
      </>
    );
  }

  return (
    <aside
      className={`detail ${isOpen ? "is-open" : ""}`}
      aria-label="Character details"
      aria-busy={status === "loading"}
    >
      <div className="detail__bar">
        <button className="btn btn--ghost" onClick={onClose}>
          <ArrowLeftIcon className="icon" />
          Back to results
        </button>
      </div>
      {content}
    </aside>
  );
}

export default CharacterDetail;

function Placeholder() {
  return (
    <div className="detail__placeholder">
      <div className="portal" aria-hidden="true">
        <div className="portal__ring" />
      </div>
      <p>
        Pick a character to see where they were last seen and every episode
        they’re in.
      </p>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="detail__section hero hero--skeleton">
        <div className="skeleton skeleton--disc" />
        <div className="skeleton-lines">
          <div className="skeleton skeleton--line" style={{ height: "1.75rem", width: "70%" }} />
          <div className="skeleton skeleton--line" style={{ width: "30%" }} />
          <div className="skeleton skeleton--line" style={{ width: "55%" }} />
          <div className="skeleton skeleton--line" style={{ width: "45%" }} />
        </div>
      </div>
    </div>
  );
}

function Episodes({ episodes }) {
  const [oldestFirst, setOldestFirst] = useState(true);

  // episode ids follow broadcast order
  const sortedEpisodes = [...episodes].sort((a, b) =>
    oldestFirst ? a.id - b.id : b.id - a.id
  );

  return (
    <section className="detail__section" aria-labelledby="episodes-title">
      <div className="episodes__head">
        <h3 id="episodes-title" className="episodes__title">
          Episodes
          <span className="episodes__count">
            Appears in {episodes.length}
          </span>
        </h3>
        <button
          className="btn btn--ghost episodes__sort"
          onClick={() => setOldestFirst((is) => !is)}
        >
          <ArrowsUpDownIcon className="icon" />
          {oldestFirst ? "Oldest first" : "Newest first"}
        </button>
      </div>
      <ol>
        {sortedEpisodes.map((item) => (
          <li className="episode" key={item.id}>
            <span className="episode__code">{item.episode}</span>
            <span className="episode__name">{item.name}</span>
            <span className="episode__date">{item.air_date}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CharacterSubDetail({ character, isItExist, addToFav, onRemoveFav }) {
  const statusKey = character.status.toLowerCase();

  return (
    <section className="detail__section hero">
      <div
        className="portal"
        data-status={statusKey}
        key={character.id}
      >
        <div className="portal__ring" aria-hidden="true" />
        <img
          src={character.image}
          alt={character.name}
          className="portal__img"
          width="300"
          height="300"
        />
      </div>
      <div>
        <h2 className="hero__name">{character.name}</h2>
        <Status status={character.status} />
        <dl className="facts">
          <dt>Species</dt>
          <dd>
            {character.species}
            {character.type && ` (${character.type})`}
          </dd>
          <dt>Gender</dt>
          <dd>{character.gender}</dd>
          <dt>Origin</dt>
          <dd>{character.origin.name}</dd>
          <dt>Last seen</dt>
          <dd>{character.location.name}</dd>
        </dl>
        {isItExist ? (
          <button
            className="btn btn--secondary"
            onClick={() => onRemoveFav(character.id)}
          >
            <HeartIcon className="icon" style={{ fill: "currentColor" }} />
            Remove from favourites
          </button>
        ) : (
          <button
            className="btn btn--primary"
            onClick={() => addToFav(character)}
          >
            <HeartIcon className="icon" />
            Add to favourites
          </button>
        )}
      </div>
    </section>
  );
}
