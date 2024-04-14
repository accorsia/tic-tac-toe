import { useState } from "react";
import { Board } from "./components/Board";


////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Renders the main game component, including the board and move history.
 * @returns {JSX.Element} - The rendered game component.
 */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);  //  vector of vectors
  const [currentMove, setCurrentMove] = useState(0);              //  current move index
  const currentSquares = history[currentMove];                    //  current status of squares vector
  const xIsNext = currentMove % 2 == 0;


  /**
   * Handles a play event of the game board
   * Function called by Board's "handleClick()"
   * After board is updated, edit history accordingly
   * @param {Array} nextSquares - Updated array of squares after move
   */
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  /**
   * Jump to board status at move "nextMove"
   * @param {number} nextMove - Move index to jump to
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //  List of buttons: map over the history
  const moves = history.map((squares, moveIndex) => {
    let description = (moveIndex > 0) ? `Go to move ${moveIndex}` : "Go to game start"

    return (
      <li key={moveIndex}>
        <button onClick={() => jumpTo(moveIndex)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      {/* Game board */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      {/* Game history */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
