import { Link } from "react-router-dom";

import GameCard from "../components/GameCard";
import games from "../data/games";

function Home() {
  return (
    <main className="container">

      {/* Hero Section */}

      <section className="hero">

        <div>
          <p className="hero-tag">
            🎮 WELCOME TO GAMEHUB
          </p>

          <h1>
            Play. Relax. <span>Have Fun.</span>
          </h1>

          <p className="hero-text">
            Enjoy quick and simple mini games.
            Choose a game and start playing instantly.
          </p>

          <Link to="/tic-tac-toe" className="btn">
            Start Playing
          </Link>
        </div>

      </section>


      {/* Games */}

      <section className="games-section">

        <div className="section-heading">
          <div>
            <h2>🎮 Games</h2>

            <p>
              Choose your favorite game and start playing.
            </p>
          </div>
        </div>


        <div className="grid">

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


      {/* About */}

      <section className="card info-section">

        <h2>About GameHub</h2>

        <p>
          GameHub is a simple mini-game website built
          using React.js. You can play different games
          directly from your browser.
        </p>

      </section>


      {/* How to Play */}

      <section className="card info-section">

  <h2>🎮 How to Play</h2>

  <p>
    Choose a game and start playing in a few simple steps.
  </p>

  <div className="how-grid">

    <div>
      <div className="step-icon">1</div>
      <h3>Choose a Game</h3>
      <p>
        Select Tic-Tac-Toe, Quiz, or Snake.
      </p>
    </div>

    <div>
      <div className="step-icon">2</div>
      <h3>Start Playing</h3>
      <p>
        Follow the game instructions and play.
      </p>
    </div>

    <div>
      <div className="step-icon">3</div>
        <h3>Have Fun</h3>
         <p>
             Try to improve your score and enjoy!
          </p>
         </div>

     </div>
      </section>
    </main>
  );
}

export default Home;