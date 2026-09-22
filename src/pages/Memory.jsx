import { useState } from "react";

const cards = [
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍓",
  "🥝",
  "🍎",
  "🍌",
  "🍇",
  "🍉",
  "🍓",
  "🥝",
];

function shuffleCards() {
  return [...cards].sort(
    () => Math.random() - 0.5
  );
}

function Memory() {
  const [gameCards, setGameCards] = useState(
    shuffleCards()
  );

  const [flipped, setFlipped] = useState([]);

  const [matched, setMatched] = useState([]);

  const [moves, setMoves] = useState(0);

  function handleCardClick(index) {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(gameCards[index])
    ) {
      return;
    }

    const newFlipped = [
      ...flipped,
      index,
    ];

    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((value) => value + 1);

      const first =
        gameCards[newFlipped[0]];

      const second =
        gameCards[newFlipped[1]];

      if (first === second) {
        setMatched((oldMatched) => [
          ...oldMatched,
          first,
        ]);

        setTimeout(() => {
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  }

  function restartGame() {
    setGameCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  const completed =
    matched.length === 6;

  return (
    <main className="container">

      <div className="memory-card">

        <div className="memory-header">

          <div>
            <h2>
              Memory Game 🧠
            </h2>

            <p>
              Find all matching pairs.
            </p>
          </div>

          <div className="memory-score">
            Moves: {moves}
          </div>

        </div>

        {completed && (
          <div className="memory-complete">
            🎉 You completed the game!
          </div>
        )}

        <div className="memory-grid">

          {gameCards.map(
            (card, index) => {

              const isFlipped =
                flipped.includes(index);

              const isMatched =
                matched.includes(card);

              return (
                <button
                  key={index}
                  className={`memory-item ${
                    isFlipped || isMatched
                      ? "show"
                      : ""
                  }`}
                  onClick={() =>
                    handleCardClick(index)
                  }
                >
                  {isFlipped || isMatched
                    ? card
                    : "?"}
                </button>
              );
            }
          )}

        </div>

        <button
          className="btn"
          onClick={restartGame}
        >
          🔄 New Game
        </button>

      </div>

    </main>
  );
}

export default Memory;