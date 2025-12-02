import React, { useEffect, useState } from "react";
import { Sun, Moon, Globe } from "lucide-react";

const THEME_KEY = "artnews_theme"; // 'light' | 'dark'
const LANG_KEY = "artnews_lang"; // 'en' | 'ur'

export const ThemeLangToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem(THEME_KEY) || (document.documentElement.classList.contains("dark") ? "dark" : "light"));
  const [lang, setLang] = useState<string>(() => localStorage.getItem(LANG_KEY) || document.documentElement.lang || "en");

  useEffect(() => {
    // apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    // apply language: set dir and font class
    if (lang === "ur") {
      document.documentElement.lang = "ur";
      document.documentElement.dir = "rtl";
      document.documentElement.classList.add("lang-ur");
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      document.documentElement.classList.remove("lang-ur");
    }
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded hover:bg-secondary"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <button
        aria-label="Toggle language"
        onClick={() => setLang(lang === "en" ? "ur" : "en")}
        className="p-2 rounded hover:bg-secondary flex items-center gap-2 text-sm"
      >
        <Globe className="h-4 w-4" />
        <span>{lang === "en" ? "EN" : "UR"}</span>
      </button>
    </div>
  );
};

export default ThemeLangToggle;
