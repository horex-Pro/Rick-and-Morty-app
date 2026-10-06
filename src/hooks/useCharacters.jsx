import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
            query.trim()
          )}`,
          { signal }
        );

        setCharacters(data.results);
      } catch (error) {
        // a cancelled request was replaced by a newer one — let that one own
        // the loading state, otherwise the UI flickers between keystrokes
        if (axios.isCancel(error)) return;

        setCharacters([]);
        // the API answers 404 when nothing matches: that's an empty result,
        // not an error worth a toast
        if (error.response?.status !== 404) {
          toast.error(error.response?.data?.error ?? "Something went wrong");
        }
      }
      setIsLoading(false);
    }
    getData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { characters, isLoading };
}
