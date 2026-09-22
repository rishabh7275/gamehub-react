import { NavLink } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <h2>🎮 GAMEHUB</h2>
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

        <div className="games-menu">

          <button
            type="button"
            className="games-menu-btn"
          >
            Games <span>⌄</span>
          </button>

          <div className="games-dropdown">

            <NavLink to="/tic-tac-toe">
              ❌ Tic-Tac-Toe
            </NavLink>

            <NavLink to="/quiz">
              🧠 Quiz
            </NavLink>

            <NavLink to="/snake">
              🐍 Snake
            </NavLink>

            <NavLink to="/memory">
              🧠 Memory
            </NavLink>

            <NavLink to="/rock-paper-scissors">
              ✊ Rock Paper Scissors
            </NavLink>

            <NavLink to="/pong">
              🏓 Pong
            </NavLink>

            <NavLink to="/chess">
              ♟️ Chess
            </NavLink>

          </div>

        </div>

      </div>

      {/* Theme */}
      <button
        type="button"
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