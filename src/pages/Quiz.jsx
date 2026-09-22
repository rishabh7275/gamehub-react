import { useEffect, useState } from "react";
import questions from "../data/question";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [bestScore, setBestScore] = useState(() => {
    const savedScore = localStorage.getItem("quiz-best-score");

    return savedScore ? Number(savedScore) : 0;
  });

  // Timer
  useEffect(() => {
    if (finished || selectedAnswer) {
      return;
    }

    if (time === 0) {
      nextQuestion(score);
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, finished, selectedAnswer]);

  // Next question
  function nextQuestion(finalScore = score) {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTime(10);
      setSelectedAnswer(null);
    } else {
      setFinished(true);

      if (finalScore > bestScore) {
        setBestScore(finalScore);

        localStorage.setItem(
          "quiz-best-score",
          finalScore
        );
      }
    }
  }

  // Check answer
  function checkAnswer(option) {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(option);

    const isCorrect =
      option === questions[current].answer;

    const newScore = isCorrect
      ? score + 1
      : score;

    setScore(newScore);

    setTimeout(() => {
      nextQuestion(newScore);
    }, 700);
  }

  // Restart
  function restartQuiz() {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setTime(10);
    setSelectedAnswer(null);
  }

  // Quiz completed
  if (finished) {
    return (
      <div className="card quiz-result">

        <div className="result-icon">
          🎉
        </div>

        <h2>Quiz Completed!</h2>

        <p className="result-score">
          Your Score
        </p>

        <h1>
          {score} / {questions.length}
        </h1>

        <p>
          Best Score: <strong>{bestScore}</strong>
        </p>

        <button
          className="btn"
          onClick={restartQuiz}
        >
          🔄 Play Again
        </button>

      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="card quiz-card">

      {/* Header */}

      <div className="quiz-title">
        <div>
          <h2>Quick Quiz 🧠</h2>

          <p>
            Test your React knowledge
          </p>
        </div>

        <div className="quiz-score">
          Score: {score}
        </div>
      </div>


      {/* Question + Timer */}

      <div className="quiz-header">

        <span>
          Question {current + 1} / {questions.length}
        </span>

        <span className="quiz-timer">
          ⏱️ {time}s
        </span>

      </div>


      {/* Progress */}

      <div className="quiz-progress">

        <div
          className="quiz-progress-bar"
          style={{
            width: `${
              ((current + 1) /
                questions.length) *
              100
            }%`,
          }}
        ></div>

      </div>


      {/* Question */}

      <div className="question-box">

        <h3>
          {question.question}
        </h3>

      </div>


      {/* Options */}

      <div className="quiz-options">

        {question.options.map((option) => {

          const isCorrect =
            option === question.answer;

          const isSelected =
            option === selectedAnswer;

          let optionClass = "quiz-option";

          if (selectedAnswer) {

            if (isCorrect) {
              optionClass += " correct";
            } else if (isSelected) {
              optionClass += " wrong";
            }

          }

          return (
            <button
              key={option}
              className={optionClass}
              onClick={() => checkAnswer(option)}
            >
              {option}

              {selectedAnswer &&
                isCorrect && (
                  <span> ✓</span>
                )}

              {selectedAnswer &&
                isSelected &&
                !isCorrect && (
                  <span> ✕</span>
                )}
            </button>
          );
        })}

      </div>


      {/* Footer */}

      <div className="quiz-footer">
        <span>
          Correct answers give +1 point
        </span>

        <span>
          Best: {bestScore}
        </span>
      </div>

    </div>
  );
}

export default Quiz;