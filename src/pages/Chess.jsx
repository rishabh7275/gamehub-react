import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { useGameStore } from "../store/gameStore";

const pieceSymbols = {
  w: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },
  b: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
};

function ChessGame() {
  const gameRef = useRef(new Chess());

  const [board, setBoard] = useState(
    gameRef.current.board()
  );

  const [selected, setSelected] = useState(null);

  const [turn, setTurn] = useState("w");

  const [gameOver, setGameOver] = useState(false);

  const [message, setMessage] = useState("");

  const {
    chessScore,
    increaseChessScore,
    resetChessScore,
  } = useGameStore();

  // Check if selected piece belongs to current player
  function isCurrentPlayer(piece) {
    if (!piece) {
      return false;
    }

    return piece.color === turn;
  }

  // Get all legal moves for selected piece
  function getLegalMoves(square) {
    return gameRef.current.moves({
      square,
      verbose: true,
    });
  }

  function handleSquareClick(row, col) {
    if (gameOver) {
      return;
    }

    const square =
      String.fromCharCode(97 + col) +
      (8 - row);

    const piece = gameRef.current.get(square);

    // No piece selected yet
    if (!selected) {
      if (!piece) {
        return;
      }

      if (!isCurrentPlayer(piece)) {
        return;
      }

      setSelected(square);
      return;
    }

    // Click same square again
    if (selected === square) {
      setSelected(null);
      return;
    }

    // Click another own piece
    if (piece && isCurrentPlayer(piece)) {
      setSelected(square);
      return;
    }

    // Check whether move is legal
    const legalMoves = getLegalMoves(selected);

    const isLegalMove = legalMoves.some(
      (move) => move.to === square
    );

    if (!isLegalMove) {
      setMessage("❌ Invalid move");
      return;
    }

    // Make the move
    try {
      gameRef.current.move({
        from: selected,
        to: square,
        promotion: "q",
      });
    } catch (error) {
      setMessage("❌ Invalid move");
      return;
    }

    // Update board
    setBoard(gameRef.current.board());

    setSelected(null);

    // Check game status
    if (gameRef.current.isCheckmate()) {
      const winner =
        gameRef.current.turn() === "w"
          ? "black"
          : "white";

      setGameOver(true);

      setMessage(
        `🏆 Checkmate! ${winner === "white" ? "White" : "Black"} wins!`
      );

      increaseChessScore(winner);

      return;
    }

    if (gameRef.current.isDraw()) {
      setGameOver(true);
      setMessage("🤝 Game Draw!");
      return;
    }

    if (gameRef.current.inCheck()) {
      setMessage("⚠️ Check!");
    } else {
      setMessage("");
    }

    // Change turn
    setTurn(gameRef.current.turn());
  }

  function resetGame() {
    gameRef.current.reset();

    setBoard(
      gameRef.current.board()
    );

    setSelected(null);

    setTurn("w");

    setGameOver(false);

    setMessage("");
  }

  function isLegalDestination(row, col) {
    if (!selected) {
      return false;
    }

    const square =
      String.fromCharCode(97 + col) +
      (8 - row);

    const legalMoves =
      getLegalMoves(selected);

    return legalMoves.some(
      (move) => move.to === square
    );
  }

  return (
    <main className="container">

      <div className="chess-card">

        {/* HEADER */}

        <div className="chess-header">

          <div>
            <h2>Chess ♟️</h2>

            <p>
              Two player chess game
            </p>
          </div>

          <div className="chess-turn">

            <div>
              {turn === "w"
                ? "⚪ White's Turn"
                : "⚫ Black's Turn"}
            </div>

            <div
              style={{
                fontSize: "0.88rem",
                marginTop: "4px",
                opacity: 0.85,
              }}
            >
              ⚪ {chessScore.white} — ⚫{" "}
              {chessScore.black}
            </div>

          </div>

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="chess-message">
            {message}
          </div>
        )}

        {/* BOARD */}

        <div className="chess-board">

          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {

              const square =
                String.fromCharCode(
                  97 + colIndex
                ) + (8 - rowIndex);

              const isSelected =
                selected === square;

              const isLegal =
                isLegalDestination(
                  rowIndex,
                  colIndex
                );

              const squareColor =
                (rowIndex + colIndex) % 2 === 0
                  ? "light"
                  : "dark";

              return (
                <button
                  key={square}
                  className={`chess-square ${squareColor} ${
                    isSelected
                      ? "selected"
                      : ""
                  } ${
                    isLegal
                      ? "legal-move"
                      : ""
                  }`}
                  onClick={() =>
                    handleSquareClick(
                      rowIndex,
                      colIndex
                    )
                  }
                >

                  {piece
                    ? pieceSymbols[piece.color][
                        piece.type
                      ]
                    : ""}

                </button>
              );
            })
          )}

        </div>

        {/* CONTROLS */}

        <div className="chess-controls">

          <button
            className="btn"
            onClick={resetGame}
          >
            🔄 New Game
          </button>

          <button
            className="btn secondary-btn"
            onClick={resetChessScore}
          >
            🗑️ Reset Score
          </button>

        </div>

        <p className="chess-tip">
          💡 Select a piece to see its legal
          moves, then choose a highlighted square.
        </p>

      </div>

    </main>
  );
}

export default ChessGame;