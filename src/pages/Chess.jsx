import { useState } from "react";

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const whitePieces = [
  "♔",
  "♕",
  "♖",
  "♗",
  "♘",
  "♙",
];

const blackPieces = [
  "♚",
  "♛",
  "♜",
  "♝",
  "♞",
  "♟",
];

function Chess() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("white");

  function isWhite(piece) {
    return whitePieces.includes(piece);
  }

  function isBlack(piece) {
    return blackPieces.includes(piece);
  }

  function isCurrentPlayer(piece) {
    if (turn === "white") {
      return isWhite(piece);
    }

    return isBlack(piece);
  }

  function handleSquareClick(row, col) {
    const piece = board[row][col];

    // Select a piece
    if (!selected) {
      if (!piece) {
        return;
      }

      if (!isCurrentPlayer(piece)) {
        return;
      }

      setSelected({
        row,
        col,
      });

      return;
    }

    // Click same piece again
    if (
      selected.row === row &&
      selected.col === col
    ) {
      setSelected(null);
      return;
    }

    const selectedPiece =
      board[selected.row][selected.col];

    // Select another own piece
    if (piece && isCurrentPlayer(piece)) {
      setSelected({
        row,
        col,
      });

      return;
    }

    // Move piece
    const newBoard = board.map((line) => [
      ...line,
    ]);

    newBoard[row][col] = selectedPiece;

    newBoard[selected.row][selected.col] =
      null;

    setBoard(newBoard);

    setSelected(null);

    setTurn(
      turn === "white"
        ? "black"
        : "white"
    );
  }

  function resetGame() {
    setBoard(initialBoard);
    setSelected(null);
    setTurn("white");
  }

  return (
    <main className="container">

      <div className="chess-card">

        <div className="chess-header">

          <div>
            <h2>Chess ♟️</h2>

            <p>
              Two player chess game
            </p>
          </div>

          <div className="chess-turn">
            {turn === "white"
              ? "⚪ White's Turn"
              : "⚫ Black's Turn"}
          </div>

        </div>

        <div className="chess-board">

          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {

              const isSelected =
                selected &&
                selected.row === rowIndex &&
                selected.col === colIndex;

              const squareColor =
                (rowIndex + colIndex) % 2 === 0
                  ? "light"
                  : "dark";

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`chess-square ${squareColor} ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSquareClick(
                      rowIndex,
                      colIndex
                    )
                  }
                >
                  {piece}
                </button>
              );
            })
          )}

        </div>

        <div className="chess-controls">

          <button
            className="btn"
            onClick={resetGame}
          >
            🔄 New Game
          </button>

        </div>

        <p className="chess-tip">
          💡 Click a piece and then click another
          square to move it.
        </p>

      </div>

    </main>
  );
}

export default Chess;