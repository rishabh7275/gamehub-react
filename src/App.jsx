import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TicTacToe from "./pages/TicTacToe";
import Quiz from "./pages/Quiz";
import Snake from "./pages/Snake";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem("gamehub-theme");
  
    return savedTheme !== "light";
  });
  useEffect(() => {
    localStorage.setItem(
      "gamehub-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
  return (
    <BrowserRouter>

  <div className={darkMode ? "dark-theme" : "light-theme"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;