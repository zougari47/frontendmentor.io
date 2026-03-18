import type { Board, Player } from "./types"

/**
 * Creates an empty Connect Four board
 * @returns A 7x6 board (7 columns, 6 rows) initialized with null values
 */
export const createBoard = () =>
  Array.from({ length: 7 }, () => Array(6).fill(null)) as Board

/**
 * helper function to log board 2D Matrix like Connect 4 UI game for debugin
 */
export const isBoardFull = (board: Board) => {
  for (let col = 0; col < 7; col++) {
    if (board[col].indexOf(null) != -1) {
      return false
    }
  }
  return true
}

/**
 * helper function to log board 2D Matrix like Connect 4 UI game for debugin
 */
export const logBoard = (board: Board) => {
  for (let row = 5; row >= 0; row--) {
    console.log(board.map((col) => col[row] ?? " ").join(" | "))
  }
}

/**
 * Adds a disk to the specified column of the board
 * @param x - Column index (0-6)
 * @param player - Player number (1 or 2)
 * @param board - The game board
 * @returns true if disk was placed successfully, false if column is full
 * @throws Error if column index is out of bounds
 */
export const addDiskToBoard = (
  x: number,
  player: 1 | 2,
  board: (number | null)[][]
) => {
  if (x < 0 || x > 6) throw new Error("The game has 7 columns")

  const emptyCellIndex = board[x].indexOf(null)
  if (emptyCellIndex === -1) return false

  board[x][emptyCellIndex] = player
  return true
}

/**
 * Checks if the last placed disk at position (x, y) created a winning condition
 * Checks all four directions: horizontal, vertical, and both diagonals
 * @param x - Column index where disk was placed
 * @param y - Row index where disk was placed
 * @param player - Player to check for win (1 or 2)
 * @param board - The game board
 * @returns Array of winning [col, row] cells if player connected 4, "DRAW" if board full, false otherwise
 */
export const checkWin = (
  x: number,
  y: number,
  player: Player,
  board: Board
): [number, number][] | "DRAW" | false => {
  const directions: [number, number][] = [
    [1, 0], // horizontal
    [0, 1], // vertical
    [1, 1], // diagonal /
    [1, -1], // diagonal \
  ]

  for (const [dx, dy] of directions) {
    const cells: [number, number][] = [[x, y]]

    // Scan positive direction
    let cx = x + dx
    let cy = y + dy
    while (
      cx >= 0 && cx <= 6 &&
      cy >= 0 && cy <= 5 &&
      board[cx][cy] === player
    ) {
      cells.push([cx, cy])
      cx += dx
      cy += dy
    }

    // Scan negative direction
    cx = x - dx
    cy = y - dy
    while (
      cx >= 0 && cx <= 6 &&
      cy >= 0 && cy <= 5 &&
      board[cx][cy] === player
    ) {
      cells.push([cx, cy])
      cx -= dx
      cy -= dy
    }

    if (cells.length >= 4) return cells
  }

  return isBoardFull(board) ? "DRAW" : false
}
