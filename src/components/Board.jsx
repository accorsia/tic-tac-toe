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
  function renderSquare(val) {
    return (
      <Square value={squares[val]} onSquareClick={() => handleClick(val)} />
    );
  }

  function renderRow(rowIndex, rowSize) {
    const sqrsAggregator = [];

    for (let i = 0; i < rowSize; i++) {
      sqrsAggregator.push(renderSquare(rowIndex * rowSize + i));
    }

    return <div class="board-row">{sqrsAggregator}</div>;
  }

  function renderBoard(rowCount, colCount) {
    const board = []; //  stack of rows

    for (let i = 0; i < rowCount; i++) {
      board.push(renderRow(i, colCount));
    }

    return board;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

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

      {renderBoard(3, 3)}
    </>
  );
}
