import React from "react"
import { useTheme } from "./ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-highlight text-dark font-bold rounded-md transition"
    >
      {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
  )
}

export default ThemeToggle