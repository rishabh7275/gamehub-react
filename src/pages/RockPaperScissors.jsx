import { useState } from "react";
import { useGameStore } from "../store/gameStore";

const choices = [
  "✊",
  "✋",
  "✌️",
];

function RockPaperScissors() {
  const [player, setPlayer] =
    useState("");

  const [computer, setComputer] =
    useState("");

  const [result, setResult] =
    useState("");

  // Consume RPS score state and actions from Zustand store
  const { rpsScore: score, increaseRpsScore, resetRpsScore } = useGameStore();

  function playGame(choice) {
    const computerChoice =
      choices[
        Math.floor(
          Math.random() *
            choices.length
        )
      ];

    setPlayer(choice);
    setComputer(computerChoice);

    if (choice === computerChoice) {
      setResult("It's a Draw!");
      return;
    }

    const playerWins =
      (choice === "✊" &&
        computerChoice === "✌️") ||
      (choice === "✋" &&
        computerChoice === "✊") ||
      (choice === "✌️" &&
        computerChoice === "✋");

    if (playerWins) {
      setResult("You Win! 🎉");
      increaseRpsScore("player");
    } else {
      setResult("Computer Wins!");
      increaseRpsScore("computer");
    }
  }

  function resetGame() {
    setPlayer("");
    setComputer("");
    setResult("");
    resetRpsScore();
  }

  return (
    <main className="container">

      <div className="rps-card">

        <h2>
          Rock Paper Scissors ✊
        </h2>

        <p>
          Choose your move.
        </p>

        <div className="rps-score">

          <div>
            <span>You</span>
            <strong>
              {score.player}
            </strong>
          </div>

          <div>
            <span>Computer</span>
            <strong>
              {score.computer}
            </strong>
          </div>

        </div>

        <div className="rps-choices">

          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() =>
                playGame(choice)
              }
            >
              {choice}
            </button>
          ))}

        </div>

        {result && (
          <div className="rps-result">

            <div>
              You:{" "}
              <strong>
                {player}
              </strong>
            </div>

            <div>
              Computer:{" "}
              <strong>
                {computer}
              </strong>
            </div>

            <h2>
              {result}
            </h2>

          </div>
        )}

        <button
          className="btn"
          onClick={resetGame}
        >
          🔄 Reset Game
        </button>

      </div>

    </main>
  );
}

export default RockPaperScissors;