import { useState } from "react";

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

  const [score, setScore] =
    useState({
      player: 0,
      computer: 0,
    });

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

      setScore((oldScore) => ({
        ...oldScore,
        player:
          oldScore.player + 1,
      }));
    } else {
      setResult("Computer Wins!");

      setScore((oldScore) => ({
        ...oldScore,
        computer:
          oldScore.computer + 1,
      }));
    }
  }

  function resetGame() {
    setPlayer("");
    setComputer("");
    setResult("");

    setScore({
      player: 0,
      computer: 0,
    });
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