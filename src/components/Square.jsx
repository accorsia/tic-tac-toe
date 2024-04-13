/**
 * Renders a single square on the game board.
 * @param {string|null} value - The value displayed in the square ('X', 'O', or null).
 * @param {Function} onSquareClick - The event handler for when the square is clicked.
 * @returns {JSX.Element} - The rendered square button.
 */
export function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
