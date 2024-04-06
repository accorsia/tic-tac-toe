import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];

    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c])
      return squares[a];
  }

  return null;
}


////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Board() {

  //  Handlers
  function handleClick(i) {
    //  Return early if square is already filled OR there's already a winner
    if (squares[i] || calculateWinner(squares))
      return;

    const nextSquares = squares.slice();

    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }


  //  States
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));


  //  Return
  return (
    <>

      <div className="status">{getStatus(squares, xIsNext)}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


function getStatus(squares, xIsNext) {
  const winner = calculateWinner(squares);

  if (winner)
    return `Winner: ${winner}`;
  else
    return "Next player: " + (xIsNext ? "X" : "O");
}