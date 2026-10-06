import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isLight = theme === "light";

  return (
    <button
      className={`theme-toggle ${isLight ? "light" : "dark"}`}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle theme"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <SunIcon className="theme-toggle__icon sun" />
      <MoonIcon className="theme-toggle__icon moon" />
      <span className="theme-toggle__thumb">
        <SunIcon className="thumb-icon thumb-icon--sun" />
        <MoonIcon className="thumb-icon thumb-icon--moon" />
      </span>
    </button>
  );
}

export default ThemeToggle;
