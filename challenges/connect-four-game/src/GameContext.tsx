import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

import { addDiskToBoard, checkWin, createBoard } from "@/lib/core/game"
import type { Board, Player } from "@/lib/core/types"

type GameResult = {
  winner: Player
  type: "connect" | "timeout"
} | {
  winner: null
  type: "draw"
} | null

interface GameState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  board: Board
  addDisk: (col: number) => void
  currentPlayer: Player
  /** Resets scores to 0 and resets the board, stays in game */
  restart: () => void
  /** Goes back to main menu */
  quitGame: () => void
  /** Starts next round after a win/draw (alternates first turn) */
  playAgain: () => void
  /** Called when a player's timer runs out */
  handleTimeout: () => void
  score: {
    playerOne: number
    playerTwo: number
  }
  isPaused: boolean
  pauseGame: () => void
  resumeGame: () => void
  gameResult: GameResult
  /** Coordinates of the cells forming the winning 4-in-a-row */
  winningCells: [number, number][] | null
  /** Which game number we're on (used to alternate first turn) */
  gameNumber: number
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 })
  const [board, setBoard] = useState(() => createBoard())
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1)
  const [isPaused, setIsPaused] = useState(false)
  const [gameResult, setGameResult] = useState<GameResult>(null)
  const [winningCells, setWinningCells] = useState<[number, number][] | null>(null)
  const [gameNumber, setGameNumber] = useState(1)

  const incrementScore = useCallback((player: Player) => {
    setScore((prev) => ({
      playerOne: player === 1 ? prev.playerOne + 1 : prev.playerOne,
      playerTwo: player === 2 ? prev.playerTwo + 1 : prev.playerTwo,
    }))
  }, [])

  function addDisk(col: number) {
    if (gameResult) return // game is over, ignore clicks

    const tempBoard = board.map((c) => [...c])
    const placed = addDiskToBoard(col, currentPlayer, tempBoard)
    if (!placed) return // column full

    // Find the row where the disk landed
    const row = tempBoard[col].lastIndexOf(currentPlayer)

    setBoard(tempBoard)

    // Check for win/draw
    const result = checkWin(col, row, currentPlayer, tempBoard)
    if (Array.isArray(result)) {
      setGameResult({ winner: currentPlayer, type: "connect" })
      setWinningCells(result)
      incrementScore(currentPlayer)
      return
    }
    if (result === "DRAW") {
      setGameResult({ winner: null, type: "draw" })
      return
    }

    // Switch player
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1))
  }

  function handleTimeout() {
    if (gameResult) return // already resolved
    const winner: Player = currentPlayer === 1 ? 2 : 1
    setGameResult({ winner, type: "timeout" })
    incrementScore(winner)
  }

  function restart() {
    setBoard(createBoard())
    setScore({ playerOne: 0, playerTwo: 0 })
    setGameResult(null)
    setWinningCells(null)
    setCurrentPlayer(1)
    setGameNumber(1)
    setIsPaused(false)
  }

  function quitGame() {
    setBoard(createBoard())
    setScore({ playerOne: 0, playerTwo: 0 })
    setGameResult(null)
    setWinningCells(null)
    setCurrentPlayer(1)
    setGameNumber(1)
    setIsPlaying(false)
    setIsPaused(false)
  }

  function playAgain() {
    const nextGameNumber = gameNumber + 1
    setBoard(createBoard())
    setGameResult(null)
    setWinningCells(null)
    // Alternate first turn: odd games → player 1, even games → player 2
    setCurrentPlayer(nextGameNumber % 2 === 1 ? 1 : 2)
    setGameNumber(nextGameNumber)
  }

  function pauseGame() {
    setIsPaused(true)
  }

  function resumeGame() {
    setIsPaused(false)
  }

  return (
    <GameContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        board,
        restart,
        quitGame,
        playAgain,
        score,
        addDisk,
        currentPlayer,
        isPaused,
        pauseGame,
        resumeGame,
        gameResult,
        winningCells,
        gameNumber,
        handleTimeout,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
