import type { Board, Player } from "./types"

const ROWS = 6
const COLS = 7

function getValidLocations(board: Board): number[] {
  const validLocations: number[] = []
  // Prefer middle columns for faster pruning
  const colOrder = [3, 2, 4, 1, 5, 0, 6]
  for (const c of colOrder) {
    if (board[c][ROWS - 1] === null) {
      validLocations.push(c)
    }
  }
  return validLocations
}

function getNextOpenRow(board: Board, c: number): number {
  for (let r = 0; r < ROWS; r++) {
    if (board[c][r] === null) {
      return r
    }
  }
  return -1
}

function checkWinningMove(board: Board, piece: Player): boolean {
  // Horizontal
  for (let c = 0; c < COLS - 3; c++) {
    for (let r = 0; r < ROWS; r++) {
      if (
        board[c][r] === piece &&
        board[c + 1][r] === piece &&
        board[c + 2][r] === piece &&
        board[c + 3][r] === piece
      ) {
        return true
      }
    }
  }
  // Vertical
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (
        board[c][r] === piece &&
        board[c][r + 1] === piece &&
        board[c][r + 2] === piece &&
        board[c][r + 3] === piece
      ) {
        return true
      }
    }
  }
  // Positive Sloped Diagonal
  for (let c = 0; c < COLS - 3; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      if (
        board[c][r] === piece &&
        board[c + 1][r + 1] === piece &&
        board[c + 2][r + 2] === piece &&
        board[c + 3][r + 3] === piece
      ) {
        return true
      }
    }
  }
  // Negative Sloped Diagonal
  for (let c = 0; c < COLS - 3; c++) {
    for (let r = 3; r < ROWS; r++) {
      if (
        board[c][r] === piece &&
        board[c + 1][r - 1] === piece &&
        board[c + 2][r - 2] === piece &&
        board[c + 3][r - 3] === piece
      ) {
        return true
      }
    }
  }
  return false
}

function evaluateWindow(window: (Player | null)[], piece: Player): number {
  let score = 0
  const oppPiece = piece === 1 ? 2 : 1
  let pieceCount = 0
  let oppCount = 0
  let emptyCount = 0

  for (let i = 0; i < 4; i++) {
    if (window[i] === piece) pieceCount++
    else if (window[i] === oppPiece) oppCount++
    else emptyCount++
  }

  // Fix 3: removed dead pieceCount === 4 branch
  if (pieceCount === 3 && emptyCount === 1) {
    score += 5
  } else if (pieceCount === 2 && emptyCount === 2) {
    score += 2
  }

  if (oppCount === 3 && emptyCount === 1) {
    score -= 80
  } else if (oppCount === 2 && emptyCount === 2) {
    score -= 3 // Fix 2: penalise early opponent threats
  } else if (oppCount === 4) {
    score -= 1000
  }

  return score
}

function scorePosition(board: Board, piece: Player): number {
  let score = 0

  // Score center column
  const centerArray: (Player | null)[] = []
  for (let r = 0; r < ROWS; r++) {
    centerArray.push(board[3][r])
  }
  const centerCount = centerArray.filter((p) => p === piece).length
  score += centerCount * 3

  // Horizontal
  for (let r = 0; r < ROWS; r++) {
    const rowArray: (Player | null)[] = []
    for (let c = 0; c < COLS; c++) rowArray.push(board[c][r])
    for (let c = 0; c < COLS - 3; c++) {
      const window = rowArray.slice(c, c + 4)
      score += evaluateWindow(window, piece)
    }
  }

  // Vertical
  for (let c = 0; c < COLS; c++) {
    const colArray = board[c]
    for (let r = 0; r < ROWS - 3; r++) {
      const window = colArray.slice(r, r + 4)
      score += evaluateWindow(window, piece)
    }
  }

  // Positive Diagonal
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [board[c][r], board[c + 1][r + 1], board[c + 2][r + 2], board[c + 3][r + 3]]
      score += evaluateWindow(window, piece)
    }
  }

  // Negative Diagonal
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [board[c][r + 3], board[c + 1][r + 2], board[c + 2][r + 1], board[c + 3][r]]
      score += evaluateWindow(window, piece)
    }
  }

  return score
}

function isTerminalNode(board: Board): boolean {
  return checkWinningMove(board, 1) || checkWinningMove(board, 2) || getValidLocations(board).length === 0
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean,
  aiPiece: Player,
  playerPiece: Player
): { column: number | null; score: number } {
  const validLocations = getValidLocations(board)
  const isTerminal = isTerminalNode(board)

  if (depth === 0 || isTerminal) {
    if (isTerminal) {
      if (checkWinningMove(board, aiPiece)) {
        return { column: null, score: 100000000000000 }
      } else if (checkWinningMove(board, playerPiece)) {
        return { column: null, score: -10000000000000 }
      } else {
        return { column: null, score: 0 }
      }
    } else {
      return { column: null, score: scorePosition(board, aiPiece) }
    }
  }

  if (maximizingPlayer) {
    let value = -Infinity
    let bestCol = validLocations[0] // Fix 4: deterministic fallback
    for (const c of validLocations) {
      const r = getNextOpenRow(board, c)
      const boardCopy = board.map((col) => [...col])
      boardCopy[c][r] = aiPiece
      const newScore = minimax(boardCopy, depth - 1, alpha, beta, false, aiPiece, playerPiece).score
      if (newScore > value) {
        value = newScore
        bestCol = c
      }
      alpha = Math.max(alpha, value)
      if (alpha >= beta) break
    }
    return { column: bestCol, score: value }
  } else {
    let value = Infinity
    let bestCol = validLocations[0] // Fix 4: deterministic fallback
    for (const c of validLocations) {
      const r = getNextOpenRow(board, c)
      const boardCopy = board.map((col) => [...col])
      boardCopy[c][r] = playerPiece
      const newScore = minimax(boardCopy, depth - 1, alpha, beta, true, aiPiece, playerPiece).score
      if (newScore < value) {
        value = newScore
        bestCol = c
      }
      beta = Math.min(beta, value)
      if (alpha >= beta) break
    }
    return { column: bestCol, score: value }
  }
}

export function getBestMove(board: Board, aiPiece: Player): number {
  const playerPiece: Player = aiPiece === 1 ? 2 : 1
  const validLocations = getValidLocations(board)

  // Fix 1a: Take the win if it exists
  for (const col of validLocations) {
    const r = getNextOpenRow(board, col)
    const copy = board.map((c) => [...c])
    copy[col][r] = aiPiece
    if (checkWinningMove(copy, aiPiece)) return col
  }

  // Fix 1b: Block opponent's immediate win
  for (const col of validLocations) {
    const r = getNextOpenRow(board, col)
    const copy = board.map((c) => [...c])
    copy[col][r] = playerPiece
    if (checkWinningMove(copy, playerPiece)) return col
  }

  // Fall back to minimax
  // Depth 5 provides a good balance between speed and intelligence.
  const { column } = minimax(board, 5, -Infinity, Infinity, true, aiPiece, playerPiece)
  return column ?? validLocations[0]
}
