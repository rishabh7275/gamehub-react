import { useEffect, useRef, useState } from "react";

const COLS = 20;
const ROWS = 20;
const CELL = 18;
const SPEED = 100;

const startSnake = [
  {
    x: 10,
    y: 10,
  },
];

function randPos(snake) {
  let position;

  do {
    position = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (
    snake.some(
      (part) =>
        part.x === position.x &&
        part.y === position.y
    )
  );

  return position;
}

function Snake() {
  const canvasRef = useRef(null);

  const [snake, setSnake] = useState(startSnake);

  const [dir, setDir] = useState({
    x: 1,
    y: 0,
  });

  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });

  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(() => {
    const savedScore =
      localStorage.getItem("snake-high-score");

    return savedScore
      ? Number(savedScore)
      : 0;
  });

  const [running, setRunning] = useState(true);

  const [gameOver, setGameOver] = useState(false);

  /*
    =========================
    KEYBOARD CONTROLS
    =========================
  */

  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key === "ArrowUp" &&
        dir.y !== 1
      ) {
        setDir({
          x: 0,
          y: -1,
        });
      }

      if (
        e.key === "ArrowDown" &&
        dir.y !== -1
      ) {
        setDir({
          x: 0,
          y: 1,
        });
      }

      if (
        e.key === "ArrowLeft" &&
        dir.x !== 1
      ) {
        setDir({
          x: -1,
          y: 0,
        });
      }

      if (
        e.key === "ArrowRight" &&
        dir.x !== -1
      ) {
        setDir({
          x: 1,
          y: 0,
        });
      }

      // Space = Pause / Resume
      if (e.code === "Space") {
        e.preventDefault();

        if (!gameOver) {
          setRunning(
            (value) => !value
          );
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [dir, gameOver]);


  /*
    =========================
    GAME LOOP
    =========================
  */

  useEffect(() => {
    if (!running || gameOver) {
      return;
    }

    const interval = setInterval(() => {
      setSnake((previousSnake) => {

        const head = {
          x:
            (previousSnake[0].x +
              dir.x +
              COLS) %
            COLS,

          y:
            (previousSnake[0].y +
              dir.y +
              ROWS) %
            ROWS,
        };


        /*
          SELF COLLISION
        */

        const collision =
          previousSnake.some(
            (part) =>
              part.x === head.x &&
              part.y === head.y
          );

        if (collision) {
          setRunning(false);
          setGameOver(true);

          return previousSnake;
        }


        /*
          CHECK FOOD
        */

        const ateFood =
          head.x === food.x &&
          head.y === food.y;


        /*
          CREATE NEW SNAKE
        */

        const newSnake = [
          head,
          ...previousSnake,
        ];


        /*
          IF FOOD NOT EATEN
          REMOVE LAST PART
        */

        if (!ateFood) {
          newSnake.pop();
        }


        /*
          IF FOOD EATEN
        */

        if (ateFood) {

          setScore((oldScore) => {
            const newScore =
              oldScore + 1;

            setHighScore(
              (oldHighScore) => {

                if (
                  newScore >
                  oldHighScore
                ) {
                  localStorage.setItem(
                    "snake-high-score",
                    String(newScore)
                  );

                  return newScore;
                }

                return oldHighScore;
              }
            );

            return newScore;
          });


          // New apple position
          setFood(
            randPos(newSnake)
          );
        }

        return newSnake;
      });

    }, SPEED);


    return () => {
      clearInterval(interval);
    };

  }, [
    dir,
    running,
    gameOver,
    food,
  ]);


  /*
    =========================
    DRAW GAME
    =========================
  */

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext("2d");

    canvas.width =
      COLS * CELL;

    canvas.height =
      ROWS * CELL;


    /*
      BACKGROUND
    */

    ctx.fillStyle = "#061426";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    /*
      GRID
    */

    for (
      let x = 0;
      x < COLS;
      x++
    ) {
      for (
        let y = 0;
        y < ROWS;
        y++
      ) {

        ctx.fillStyle =
          (x + y) % 2 === 0
            ? "rgba(255,255,255,0.025)"
            : "rgba(255,255,255,0.012)";

        ctx.fillRect(
          x * CELL,
          y * CELL,
          CELL,
          CELL
        );
      }
    }


    /*
      =========================
      APPLE 🍎
      =========================
    */

    const appleX =
      food.x * CELL +
      CELL / 2;

    const appleY =
      food.y * CELL +
      CELL / 2 +
      1;


    // Apple shadow

    ctx.beginPath();

    ctx.arc(
      appleX,
      appleY + 1,
      7,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(0,0,0,0.3)";

    ctx.fill();


    // Apple body

    const appleGradient =
      ctx.createRadialGradient(
        appleX - 2,
        appleY - 3,
        1,
        appleX,
        appleY,
        8
      );

    appleGradient.addColorStop(
      0,
      "#ff7676"
    );

    appleGradient.addColorStop(
      1,
      "#c1121f"
    );

    ctx.beginPath();

    ctx.arc(
      appleX,
      appleY,
      7,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      appleGradient;

    ctx.fill();


    // Apple stem

    ctx.beginPath();

    ctx.moveTo(
      appleX,
      appleY - 6
    );

    ctx.lineTo(
      appleX + 2,
      appleY - 10
    );

    ctx.strokeStyle =
      "#6b4226";

    ctx.lineWidth = 2;

    ctx.stroke();


    // Apple leaf

    ctx.beginPath();

    ctx.ellipse(
      appleX + 4,
      appleY - 8,
      4,
      2,
      -0.5,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "#4ade80";

    ctx.fill();


    /*
      =========================
      SNAKE 🐍
      =========================
    */

    snake.forEach(
      (part, index) => {

        const centerX =
          part.x * CELL +
          CELL / 2;

        const centerY =
          part.y * CELL +
          CELL / 2;


        /*
          BODY SIZE
        */

        const radius =
          index === 0
            ? 8
            : 7;


        /*
          SNAKE GRADIENT
        */

        const snakeGradient =
          ctx.createRadialGradient(
            centerX - 2,
            centerY - 2,
            1,
            centerX,
            centerY,
            radius
          );


        if (index === 0) {

          snakeGradient.addColorStop(
            0,
            "#bbf7d0"
          );

          snakeGradient.addColorStop(
            1,
            "#059669"
          );

        } else {

          snakeGradient.addColorStop(
            0,
            "#4ade80"
          );

          snakeGradient.addColorStop(
            1,
            "#15803d"
          );
        }


        /*
          DRAW BODY
        */

        ctx.beginPath();

        ctx.arc(
          centerX,
          centerY,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          snakeGradient;

        ctx.fill();


        /*
          BODY HIGHLIGHT
        */

        if (index !== 0) {

          ctx.beginPath();

          ctx.arc(
            centerX - 2,
            centerY - 2,
            2,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            "rgba(255,255,255,0.25)";

          ctx.fill();
        }


        /*
          SNAKE HEAD
        */

        if (index === 0) {

          /*
            EYES
          */

          ctx.fillStyle =
            "#ffffff";


          ctx.beginPath();

          ctx.arc(
            centerX - 3,
            centerY - 3,
            2,
            0,
            Math.PI * 2
          );

          ctx.fill();


          ctx.beginPath();

          ctx.arc(
            centerX + 3,
            centerY - 3,
            2,
            0,
            Math.PI * 2
          );

          ctx.fill();


          /*
            PUPILS
          */

          ctx.fillStyle =
            "#111827";


          ctx.beginPath();

          ctx.arc(
            centerX - 3,
            centerY - 3,
            1,
            0,
            Math.PI * 2
          );

          ctx.fill();


          ctx.beginPath();

          ctx.arc(
            centerX + 3,
            centerY - 3,
            1,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      }
    );

  }, [snake, food]);


  /*
    =========================
    RESTART GAME
    =========================
  */

  function restart() {

    const newSnake = [
      {
        x: 10,
        y: 10,
      },
    ];

    setSnake(newSnake);

    setDir({
      x: 1,
      y: 0,
    });

    setFood(
      randPos(newSnake)
    );

    setScore(0);

    setGameOver(false);

    setRunning(true);
  }


  /*
    =========================
    UI
    =========================
  */

  return (
    <main className="container">

      <div className="snake-card">


        {/* HEADER */}

        <div className="snake-header">

          <div>

            <h2>
              Snake 🐍
            </h2>

            <p>
              Use Arrow Keys to move
              <br />
              Press Space to pause
            </p>

          </div>


          {/* SCORE */}

          <div className="snake-scores">

            <div>

              <span>
                Score
              </span>

              <strong>
                {score}
              </strong>

            </div>


            <div>

              <span>
                High Score
              </span>

              <strong>
                {highScore}
              </strong>

            </div>

          </div>

        </div>


        {/* GAME OVER */}

        {gameOver && (

          <div className="snake-game-over">

            <div className="snake-over-icon">
              💀
            </div>

            <h2>
              Game Over!
            </h2>

            <p>
              Your Score:{" "}
              <strong>
                {score}
              </strong>
            </p>

            <button
              className="btn"
              onClick={restart}
            >
              🔄 Play Again
            </button>

          </div>

        )}


        {/* PAUSED */}

        {!running &&
          !gameOver && (

            <div className="snake-paused">
              ⏸️ Game Paused
            </div>

          )}


        {/* GAME BOARD */}

        <div className="snake-board">

          <canvas
            ref={canvasRef}
          />

        </div>


        {/* BUTTONS */}

        <div className="snake-controls">

          <button
            className="btn"
            onClick={() =>
              setRunning(
                (value) => !value
              )
            }
            disabled={gameOver}
          >
            {running
              ? "⏸️ Pause"
              : "▶️ Resume"}
          </button>


          <button
            className="btn"
            onClick={restart}
          >
            🔄 Restart
          </button>

        </div>
        {/* MOBILE CONTROLS */}

        <div className="snake-mobile-controls">

          <button
            onClick={() => {
              if (dir.y !== 1) {
                setDir({
                  x: 0,
                  y: -1,
                });
              }
            }}
          >
            ↑
          </button>

          <div>

            <button
              onClick={() => {
                if (dir.x !== 1) {
                  setDir({
                    x: -1,
                    y: 0,
                  });
                }
              }}
            >
              ←
            </button>

            <button
              onClick={() => {
                if (dir.y !== -1) {
                  setDir({
                    x: 0,
                    y: 1,
                  });
                }
              }}
            >
              ↓
            </button>

            <button
              onClick={() => {
                if (dir.x !== -1) {
                  setDir({
                    x: 1,
                    y: 0,
                  });
                }
              }}
            >
              →
            </button>

          </div>

        </div>

        {/* TIP */}

        <p className="snake-tip">
          💡 Eat the 🍎 to grow your
          snake and increase your score.
        </p>

      </div>

    </main>
  );
}

export default Snake;