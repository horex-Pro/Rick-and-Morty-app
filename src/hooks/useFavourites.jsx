import { useEffect, useState } from "react";

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export default function useFavourites(title, initialState) {
  const [value, setValue] = useState(() => read(title, initialState));

  useEffect(() => {
    try {
      localStorage.setItem(title, JSON.stringify(value));
    } catch {
      // storage full or blocked: keep working in memory
    }
  }, [title, value]);

  return [value, setValue];
}
