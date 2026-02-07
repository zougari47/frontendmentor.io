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
 * @param palyer - Player to check for win (1 or 2)
 * @param board - The game board
 * @returns true if player has connected 4, false otherwise
 */
export const checkWin = (
  x: number,
  y: number,
  player: Player,
  board: Board
) => {
  let [currX, currY] = [x, y]
  let count = 1
  let isWinner = false

  function getNextCell(dx: number, dy: number) {
    const result = [currX + dx, currY + dy]
    return result //[nextX, nextY]
  }

  function move(dx: number, dy: number) {
    currX = x
    currY = y
    do {
      const [nx, ny] = getNextCell(dx, dy)

      if (nx < 0 || nx > 6 || ny < 0 || ny > 5 || isWinner) break // out of bound

      const isCellValid = board[nx][ny] === player

      if (isCellValid) {
        currX = nx
        currY = ny
        count++
      } else {
        break
      }

      console.log({ count })
      if (count === 4) {
        isWinner = true
      }
    } while (true)
  }

  // horizontal
  move(1, 0)
  move(-1, 0)

  // vertical
  count = 1
  move(0, 1)
  move(0, -1)

  // diagonal /
  count = 1
  move(-1, -1)
  move(1, 1)

  // diagonal \
  count = 1
  move(-1, 1)
  move(1, -1)

  return isWinner ? true : isBoardFull(board) ? "DRAW" : false
}
