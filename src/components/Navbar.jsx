import { NavLink } from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode,
}) {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <div>
          <h2>GAMEHUB</h2>
          <p>Play quick mini games</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/tic-tac-toe"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Tic-Tac-Toe
        </NavLink>

        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Quiz
        </NavLink>

        <NavLink
          to="/snake"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Snake
        </NavLink>

      </div>

      {/* Theme Button */}

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode((value) => !value)
        }
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

    </nav>
  );
}

export default Navbar;