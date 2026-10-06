import { create } from "zustand";

/*
  ======================================================
  LOCAL STORAGE LOADERS (Safe with fallback defaults)
  ======================================================
*/

// TicTacToe
const getInitialTttScore = () => {

    try {
    const saved = localStorage.getItem("ttt-score");
    return saved ? JSON.parse(saved) : { X: 0, O: 0 };
  } catch {
    return { X: 0, O: 0 };
  }
};

// Rock Paper Scissors
const getInitialRpsScore = () => {
  try {
    const saved = localStorage.getItem("rps-score");
    return saved ? JSON.parse(saved) : { player: 0, computer: 0 };
  } catch {
    return { player: 0, computer: 0 };
  }
};

// Pong
const getInitialPongScore = () => {
  try {
    const saved = localStorage.getItem("pong-score");
    return saved ? JSON.parse(saved) : { player: 0, computer: 0 };
  } catch {
    return { player: 0, computer: 0 };
  }
};

// Quiz
const getInitialQuizHighScore = () => {
  try {
    const saved = localStorage.getItem("quiz-best-score");
    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
};

// Snake
const getInitialSnakeHighScore = () => {
  try {
    const saved = localStorage.getItem("snake-high-score");
    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
};

// Memory Game
const getInitialMemoryBestMoves = () => {
  try {
    const saved = localStorage.getItem("memory-best-moves");
    return saved ? Number(saved) : null;
  } catch {
    return null;
  }
};

const getInitialMemoryGamesWon = () => {
  try {
    const saved = localStorage.getItem("memory-games-won");
    return saved ? Number(saved) : 0;
  } catch {
    return 0;
  }
};

// Chess
const getInitialChessScore = () => {
  try {
    const saved = localStorage.getItem("chess-score");
    return saved ? JSON.parse(saved) : { white: 0, black: 0 };
  } catch {
    return { white: 0, black: 0 };
  }
};

/*
  ======================================================
  UNIFIED GAMEHUB ZUSTAND STORE
  ======================================================
*/
const useGameStore = create((set) => ({
  /* ---------------------------------------------------
     1. TIC-TAC-TOE (Maintains existing names)
  --------------------------------------------------- */
  score: getInitialTttScore(),

  increaseScore: (player) =>
    set((state) => {
      if (!player) return state;
      const updatedScore = {
        ...state.score,
        [player]: (state.score[player] || 0) + 1,
      };
      localStorage.setItem("ttt-score", JSON.stringify(updatedScore));
      return { score: updatedScore };
    }),

  resetScore: () => {
    const cleared = { X: 0, O: 0 };
    localStorage.setItem("ttt-score", JSON.stringify(cleared));
    set({ score: cleared });
  },

  /* ---------------------------------------------------
     2. ROCK PAPER SCISSORS
  --------------------------------------------------- */
  rpsScore: getInitialRpsScore(),

  increaseRpsScore: (winner) =>
    set((state) => {
      if (!winner) return state;
      const updatedRps = {
        ...state.rpsScore,
        [winner]: (state.rpsScore[winner] || 0) + 1,
      };
      localStorage.setItem("rps-score", JSON.stringify(updatedRps));
      return { rpsScore: updatedRps };
    }),

  resetRpsScore: () => {
    const cleared = { player: 0, computer: 0 };
    localStorage.setItem("rps-score", JSON.stringify(cleared));
    set({ rpsScore: cleared });
  },

  /* ---------------------------------------------------
     3. PONG
  --------------------------------------------------- */
  pongScore: getInitialPongScore(),

  increasePongScore: (scorer) =>
    set((state) => {
      if (!scorer) return state;
      const updatedPong = {
        ...state.pongScore,
        [scorer]: (state.pongScore[scorer] || 0) + 1,
      };
      localStorage.setItem("pong-score", JSON.stringify(updatedPong));
      return { pongScore: updatedPong };
    }),

  resetPongScore: () => {
    const cleared = { player: 0, computer: 0 };
    localStorage.setItem("pong-score", JSON.stringify(cleared));
    set({ pongScore: cleared });
  },

  /* ---------------------------------------------------
     4. QUIZ
  --------------------------------------------------- */
  quizHighScore: getInitialQuizHighScore(),

  updateQuizHighScore: (finalScore) =>
    set((state) => {
      if (finalScore > state.quizHighScore) {
        localStorage.setItem("quiz-best-score", String(finalScore));
        return { quizHighScore: finalScore };
      }
      return state;
    }),

  resetQuizHighScore: () => {
    localStorage.setItem("quiz-best-score", "0");
    set({ quizHighScore: 0 });
  },

  /* ---------------------------------------------------
     5. SNAKE
  --------------------------------------------------- */
  snakeHighScore: getInitialSnakeHighScore(),

  updateSnakeHighScore: (newScore) =>
    set((state) => {
      if (newScore > state.snakeHighScore) {
        localStorage.setItem("snake-high-score", String(newScore));
        return { snakeHighScore: newScore };
      }
      return state;
    }),

  resetSnakeHighScore: () => {
    localStorage.setItem("snake-high-score", "0");
    set({ snakeHighScore: 0 });
  },

  /* ---------------------------------------------------
     6. MEMORY GAME
  --------------------------------------------------- */
  memoryBestMoves: getInitialMemoryBestMoves(),
  memoryGamesWon: getInitialMemoryGamesWon(),

  recordMemoryWin: (moves) =>
    set((state) => {
      const updatedWon = state.memoryGamesWon + 1;
      const updatedBest =
        state.memoryBestMoves === null
          ? moves
          : Math.min(state.memoryBestMoves, moves);

      localStorage.setItem("memory-games-won", String(updatedWon));
      localStorage.setItem("memory-best-moves", String(updatedBest));

      return {
        memoryGamesWon: updatedWon,
        memoryBestMoves: updatedBest,
      };
    }),

  resetMemoryStats: () => {
    localStorage.removeItem("memory-best-moves");
    localStorage.removeItem("memory-games-won");
    set({
      memoryBestMoves: null,
      memoryGamesWon: 0,
    });
  },

  /* ---------------------------------------------------
     7. CHESS
  --------------------------------------------------- */
  chessScore: getInitialChessScore(),

  increaseChessScore: (winner) =>
    set((state) => {
      if (!winner) return state;
      const updated = {
        ...state.chessScore,
        [winner]: (state.chessScore[winner] || 0) + 1,
      };
      localStorage.setItem("chess-score", JSON.stringify(updated));
      return { chessScore: updated };
    }),

  resetChessScore: () => {
    const cleared = { white: 0, black: 0 };
    localStorage.setItem("chess-score", JSON.stringify(cleared));
    set({ chessScore: cleared });
  },
}));

export { useGameStore };
export default useGameStore;