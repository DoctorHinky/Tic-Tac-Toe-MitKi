import { useState } from "react";

import "./TicTacToe.css";

const initArr = Array(9).fill(null);

function TicTacToe() {
  const [board, setBoard] = useState(initArr);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(true);

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes(null) ? null : "draw";
  };

  const playerMove = (index) => {
    const winner = checkWinner(board); // winner hier überprüfen

    if (winner) return; // Wenn schon ein Gewinner oder ein Unentschieden, kann der Spieler nicht mehr ziehen.

    if (!board[index] && isPlayersTurn) {
      const newBoard = [...board];
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsPlayersTurn(false);
      setTimeout(() => {
        if (checkWinner(newBoard) === null) {
          isEasyMode ? aiMoveEasy(newBoard) : aiMove(newBoard);
        }
      }, 500);
    }
  };

  const aiMoveEasy = (board) => {
    let availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((cell) => cell !== null);
    if (availableMoves.length > 0) {
      let easyMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      board[easyMove] = "O";
      setBoard([...board]);
      setIsPlayersTurn(true);
    }
  };

  const minimax = (board, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === "X") return -10;
    if (winner === "O") return 10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "O";
          let score = minimax(board, false);
          board[index] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "X";
          let score = minimax(board, true);
          board[index] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  const aiMove = (board) => {
    let bestMove;
    let bestScore = -Infinity;
    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = "O";
        let score = minimax(board, false);
        board[index] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = index;
        }
      }
    });
    if (bestMove !== undefined) {
      board[bestMove] = "O";
      setBoard([...board]);
      setIsPlayersTurn(true);
    }
  };

  const winner = checkWinner(board); // Den winner hier berechnen

  const restart = () => {
    setBoard(initArr);
    setIsPlayersTurn(true);
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe mit KI</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => playerMove(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <>
          <h2>{winner === "draw" ? "Unentschieden!" : `${winner} gewinnt!`}</h2>
          <div className="buttons">
            <button onClick={restart}>Restart</button>
            <button onClick={() => setIsEasyMode(!isEasyMode)}>
              {isEasyMode ? "Schwer" : "Leicht"}
            </button>
            <button onClick={restart}>Quit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TicTacToe;
