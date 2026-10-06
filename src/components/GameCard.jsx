import { Link } from "react-router-dom";

function GameCard({ title, desc, to, image }) {
  return (
    <div className="game-card">

      <img
        src={image}
        alt={title}
        className="game-card-image"
      />

      <div className="game-card-content">

        <h3>{title}</h3>

        <p>{desc}</p>

        <Link
          to={to}
          className="game-card-btn"
        >
          Play Now →
        </Link>

      </div>

    </div>
  );
}

export default GameCard;