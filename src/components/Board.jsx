import { Square } from "./Square";
import { calculateWinner, getStatus } from "../Utils";

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Renders the game board with squares.
 * @param {boolean} xIsNext - Indicates whether it's 'X' player's turn.
 * @param {Array<string|null>} squares - The array representing the current game state.
 * @param {Function} onPlay - The event handler for when a square is played.
 * @returns {JSX.Element} - The rendered game board.
 */
export function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Return early if square is already filled OR there's already a winner
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    //  Update history: pass the updated "squares" to the parent component's function "handlePlay"
    onPlay(nextSquares);
  }

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
