import { useEffect, useRef, useState } from "react";

const WIDTH = 600;
const HEIGHT = 350;

function Pong() {
  const canvasRef = useRef(null);

  const [score, setScore] = useState({
    player: 0,
    computer: 0,
  });

  const keys = useRef({
    up: false,
    down: false,
  });

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    let playerY = 140;
    let computerY = 140;

    let ballX = 300;
    let ballY = 175;

    let ballSpeedX = 4;
    let ballSpeedY = 3;

    function keyDown(e) {
      if (e.key === "ArrowUp") {
        keys.current.up = true;
      }

      if (e.key === "ArrowDown") {
        keys.current.down = true;
      }
    }

    function keyUp(e) {
      if (e.key === "ArrowUp") {
        keys.current.up = false;
      }

      if (e.key === "ArrowDown") {
        keys.current.down = false;
      }
    }

    window.addEventListener(
      "keydown",
      keyDown
    );

    window.addEventListener(
      "keyup",
      keyUp
    );

    function gameLoop() {

      // Player movement

      if (keys.current.up) {
        playerY -= 6;
      }

      if (keys.current.down) {
        playerY += 6;
      }

      playerY = Math.max(
        0,
        Math.min(
          HEIGHT - 80,
          playerY
        )
      );


      // Computer movement

      if (ballY > computerY + 40) {
        computerY += 3;
      }

      if (ballY < computerY + 40) {
        computerY -= 3;
      }

      computerY = Math.max(
        0,
        Math.min(
          HEIGHT - 80,
          computerY
        )
      );


      // Ball movement

      ballX += ballSpeedX;
      ballY += ballSpeedY;


      // Top / bottom

      if (
        ballY <= 0 ||
        ballY >= HEIGHT
      ) {
        ballSpeedY *= -1;
      }


      // Player collision

      if (
        ballX <= 35 &&
        ballY > playerY &&
        ballY < playerY + 80
      ) {
        ballSpeedX *= -1;
      }


      // Computer collision

      if (
        ballX >= WIDTH - 35 &&
        ballY > computerY &&
        ballY < computerY + 80
      ) {
        ballSpeedX *= -1;
      }


      // Computer scores

      if (ballX < 0) {

        setScore((oldScore) => ({
          ...oldScore,
          computer:
            oldScore.computer + 1,
        }));

        ballX = WIDTH / 2;
        ballY = HEIGHT / 2;
        ballSpeedX = 4;
      }


      // Player scores

      if (ballX > WIDTH) {

        setScore((oldScore) => ({
          ...oldScore,
          player:
            oldScore.player + 1,
        }));

        ballX = WIDTH / 2;
        ballY = HEIGHT / 2;
        ballSpeedX = -4;
      }


      // Draw background

      ctx.fillStyle = "#061426";

      ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
      );


      // Middle line

      ctx.strokeStyle =
        "rgba(255,255,255,0.2)";

      ctx.setLineDash([
        8,
        8,
      ]);

      ctx.beginPath();

      ctx.moveTo(
        WIDTH / 2,
        0
      );

      ctx.lineTo(
        WIDTH / 2,
        HEIGHT
      );

      ctx.stroke();

      ctx.setLineDash([]);


      // Player

      ctx.fillStyle = "#a855f7";

      ctx.fillRect(
        15,
        playerY,
        12,
        80
      );


      // Computer

      ctx.fillStyle = "#ec4899";

      ctx.fillRect(
        WIDTH - 27,
        computerY,
        12,
        80
      );


      // Ball

      ctx.beginPath();

      ctx.arc(
        ballX,
        ballY,
        8,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#ffffff";

      ctx.fill();


      requestAnimationFrame(
        gameLoop
      );
    }

    gameLoop();

    return () => {
      window.removeEventListener(
        "keydown",
        keyDown
      );

      window.removeEventListener(
        "keyup",
        keyUp
      );
    };

  }, []);

  function resetGame() {
    setScore({
      player: 0,
      computer: 0,
    });
  }

  return (
    <main className="container">

      <div className="pong-card">

        <div className="pong-header">

          <div>
            <h2>
              Pong 🏓
            </h2>

            <p>
              Use ↑ and ↓ keys to move.
            </p>
          </div>

          <div className="pong-score">
            {score.player} :{" "}
            {score.computer}
          </div>

        </div>

        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
        />

        <button
          className="btn"
          onClick={resetGame}
        >
          🔄 Reset Score
        </button>

      </div>

    </main>
  );
}

export default Pong;