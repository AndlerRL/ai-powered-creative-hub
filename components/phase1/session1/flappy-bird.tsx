"use client";

import { useEffect, useState } from "react";

const GAME_HEIGHT = 500;
const BIRD_SIZE = 20;
const JUMP_HEIGHT = 50;
const GRAVITY = 2;

export default function FlappyBird() {
  const [birdPosition, setBirdPosition] = useState(250);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Gravity effect
  useEffect(() => {
    let gameLoop: NodeJS.Timeout;
    if (isPlaying) {
      gameLoop = setInterval(() => {
        setBirdPosition((position) => {
          const newPosition = position + GRAVITY;
          if (newPosition > GAME_HEIGHT - BIRD_SIZE || newPosition < 0) {
            endGame();
            return position;
          }
          return newPosition;
        });
      }, 20);
    }
    return () => clearInterval(gameLoop);
  }, [isPlaying]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!isPlaying && !gameOver) {
          startGame();
        } else if (isPlaying) {
          jump();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, gameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setBirdPosition(250);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
  };

  const jump = () => {
    if (isPlaying) {
      setBirdPosition((position) => Math.max(0, position - JUMP_HEIGHT));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-blue-100">
      <div className="relative w-[400px] h-[500px] bg-blue-300 overflow-hidden">
        {/* Bird */}
        <div
          className="absolute w-5 h-5 bg-yellow-400 rounded-full transition-all duration-200"
          style={{
            left: "100px",
            top: `${birdPosition}px`,
          }}
        />

        {/* Score */}
        <div className="absolute top-4 left-4 text-2xl font-bold text-white">
          {score}
        </div>

        {/* Start Screen */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-white">Press Space to Start</div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <div className="text-4xl font-bold text-white mb-4">Game Over!</div>
            <div className="text-2xl text-white mb-4">Score: {score}</div>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
