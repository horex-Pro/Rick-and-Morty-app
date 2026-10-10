import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { flushSync } from "react-dom";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isLight = theme === "light";

  const toggle = () => {
    const next = isLight ? "dark" : "light";
    // cross-fade the whole page in one composited snapshot instead of
    // transitioning every element's colours individually
    if (!document.startViewTransition) return setTheme(next);
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return (
    <button
      className={`theme-toggle ${isLight ? "light" : "dark"}`}
      onClick={toggle}
      role="switch"
      aria-checked={!isLight}
      aria-label="Dark mode"
    >
      <SunIcon className="theme-toggle__icon" />
      <MoonIcon className="theme-toggle__icon" />
      <span className="theme-toggle__thumb">
        <SunIcon className="thumb-icon thumb-icon--sun" />
        <MoonIcon className="thumb-icon thumb-icon--moon" />
      </span>
    </button>
  );
}

export default ThemeToggle;
