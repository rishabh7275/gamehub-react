import { Link } from "react-router-dom";

function GameCard({ title, desc, to }) {
  return (
    <Link to={to} className="card game-card">
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>

      <div className="game-icon">
        {title.slice(0, 2).toUpperCase()}
      </div>
    </Link>
  );
}

export default GameCard;