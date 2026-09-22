import { Link } from "react-router-dom";

import GameCard from "../components/GameCard";
import games from "../data/games";

function Home() {
  return (
    <main className="home-page">

      {/* HERO */}

      <section className="home-hero">

        <div className="hero-content">

          <p className="hero-badge">
            🎮 WELCOME TO GAMEHUB
          </p>

          <h1>
            Play. Relax.
            <br />
            <span>Have Fun.</span>
          </h1>

          <p className="hero-description">
            Discover fun and simple mini games
            built with React.js. Choose a game,
            start playing and enjoy!
          </p>

          <div className="hero-buttons">

            <Link
              to="/tic-tac-toe"
              className="btn"
            >
              🎮 Start Playing
            </Link>

            <a
              href="#games"
              className="home-outline-btn"
            >
              Explore Games
            </a>

          </div>

        </div>

        <div className="hero-game-icon">
          🎮
        </div>

      </section>


      {/* STATS */}

      <section className="home-stats">

        <div className="stat-box">
          <strong>{games.length}</strong>
          <span>Games</span>
        </div>

        <div className="stat-box">
          <strong>100%</strong>
          <span>Free</span>
        </div>

        <div className="stat-box">
          <strong>24/7</strong>
          <span>Play Anytime</span>
        </div>

        <div className="stat-box">
          <strong>React</strong>
          <span>Built With</span>
        </div>

      </section>


      {/* GAMES */}

      <section
        className="home-games"
        id="games"
      >

        <div className="home-section-heading">

          <div>

            <p className="section-label">
              🕹️ GAME COLLECTION
            </p>

            <h2>
              Choose Your Game
            </h2>

            <p>
              Pick a game and start playing
              instantly.
            </p>

          </div>

          <span className="game-count">
            {games.length} Games
          </span>

        </div>


        <div className="home-game-grid">

          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              desc={game.desc}
              to={game.to}
            />
          ))}

        </div>

      </section>


      {/* FEATURE SECTION */}

      <section className="home-feature">

        <div className="feature-icon">
          ⚡
        </div>

        <div>

          <h2>
            Quick & Easy Gaming
          </h2>

          <p>
            No complicated setup. Just choose
            your favorite game and start playing
            directly in your browser.
          </p>

        </div>

      </section>


      {/* HOW TO PLAY */}

      <section className="home-how">

        <div className="home-section-heading">

          <div>

            <p className="section-label">
              🎮 SIMPLE STEPS
            </p>

            <h2>
              How to Play
            </h2>

            <p>
              Start playing in just three
              simple steps.
            </p>

          </div>

        </div>


        <div className="home-steps">

          <div className="home-step">

            <div className="home-step-number">
              01
            </div>

            <div className="home-step-icon">
              🎯
            </div>

            <h3>
              Choose a Game
            </h3>

            <p>
              Select any game from the GameHub
              collection.
            </p>

          </div>


          <div className="home-step">

            <div className="home-step-number">
              02
            </div>

            <div className="home-step-icon">
              🕹️
            </div>

            <h3>
              Start Playing
            </h3>

            <p>
              Follow the instructions and start
              playing instantly.
            </p>

          </div>


          <div className="home-step">

            <div className="home-step-number">
              03
            </div>

            <div className="home-step-icon">
              🏆
            </div>

            <h3>
              Enjoy & Improve
            </h3>

            <p>
              Play again and try to improve your
              score.
            </p>

          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section className="home-about">

        <div className="about-icon">
          🎮
        </div>

        <div>

          <p className="section-label">
            ABOUT GAMEHUB
          </p>

          <h2>
            One Place. Many Games.
          </h2>

          <p>
            GameHub is a mini-games website built
            using React.js. It includes different
            interactive games with a clean,
            responsive and user-friendly interface.
          </p>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="home-cta">

        <div>

          <p className="section-label">
            READY TO PLAY?
          </p>

          <h2>
            Let the Games Begin! 🎮
          </h2>

          <p>
            Choose your favorite game and start
            playing right now.
          </p>

        </div>

        <Link
          to="/tic-tac-toe"
          className="btn"
        >
          Play Now →
        </Link>

      </section>

    </main>
  );
}

export default Home;