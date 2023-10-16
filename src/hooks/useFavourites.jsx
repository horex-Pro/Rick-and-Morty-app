import { useEffect, useState } from "react";

export default function useFavourites(title, initialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(title)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(value));
  }, [title, value]);

  return [value, setValue];
}
