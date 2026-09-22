import { useEffect, useState } from "react";

const initialBoard = Array(9).fill(null);

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board) {
  for (const [a, b, c] of winningLines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [xNext, setXNext] = useState(true);

  const [score, setScore] = useState(() => {
    const savedScore =
      localStorage.getItem("ttt-score");

    return savedScore
      ? JSON.parse(savedScore)
      : { X: 0, O: 0 };
  });

  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  function handleClick(index) {
    if (board[index] || winner || draw) {
      return;
    }

    const newBoard = [...board];

    newBoard[index] = xNext ? "X" : "O";

    setBoard(newBoard);
    setXNext(!xNext);
  }

  function resetGame() {
    setBoard(initialBoard);
    setXNext(true);
  }

  function resetScore() {
    setScore({
      X: 0,
      O: 0,
    });

    localStorage.setItem(
      "ttt-score",
      JSON.stringify({
        X: 0,
        O: 0,
      })
    );
  }

  // Update score after winner
  useEffect(() => {
    if (!winner) {
      return;
    }

    setScore((oldScore) => ({
      ...oldScore,
      [winner]: oldScore[winner] + 1,
    }));
  }, [winner]);

  // Save score
  useEffect(() => {
    localStorage.setItem(
      "ttt-score",
      JSON.stringify(score)
    );
  }, [score]);

  return (
    <main className="container">

      <div className="ttt-card">

        {/* Header */}

        <div className="ttt-header">

          <div>
            <h2>Tic-Tac-Toe 🎮</h2>

            <p>
              Play with a friend and keep your score.
            </p>
          </div>

          <div className="ttt-score">

            <span>X</span>

            <strong>
              {score.X}
            </strong>

            <span className="score-line">
              —
            </span>

            <strong>
              {score.O}
            </strong>

            <span>O</span>

          </div>

        </div>


        {/* Game Status */}

        <div
          className={
            winner
              ? "ttt-status winner"
              : draw
              ? "ttt-status draw"
              : "ttt-status"
          }
        >
          {winner
            ? `🏆 Player ${winner} Wins!`
            : draw
            ? "🤝 It's a Draw!"
            : `Player ${
                xNext ? "X" : "O"
              }'s Turn`}
        </div>


        {/* Board */}

        <div className="ttt-board">

          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${
                cell === "X"
                  ? "cell-x"
                  : cell === "O"
                  ? "cell-o"
                  : ""
              }`}
              onClick={() =>
                handleClick(index)
              }
            >
              {cell}
            </button>
          ))}

        </div>


        {/* Buttons */}

        <div className="ttt-buttons">

          <button
            className="btn"
            onClick={resetGame}
          >
            🔄 New Game
          </button>

          <button
            className="btn secondary-btn"
            onClick={resetScore}
          >
            🗑️ Reset Score
          </button>

        </div>

      </div>

    </main>
  );
}

export default TicTacToe;