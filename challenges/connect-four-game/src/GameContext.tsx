import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import { addDiskToBoard, checkWin, createBoard } from "@/lib/core/game"
import { getBestMove } from "@/lib/core/cpu"
import type { Board, Player } from "@/lib/core/types"

type GameResult = {
  winner: Player
  type: "connect" | "timeout"
} | {
  winner: null
  type: "draw"
} | null

export type GameMode = "vsPlayer" | "vsCPU"

interface GameState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  gameMode: GameMode
  setGameMode: (gameMode: GameMode) => void
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
  const [gameMode, setGameMode] = useState<GameMode>("vsPlayer")
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

  const addDisk = useCallback((col: number) => {
    if (gameResult || isPaused) return

    setBoard((prevBoard) => {
      const tempBoard = prevBoard.map((c) => [...c])
      const placed = addDiskToBoard(col, currentPlayer, tempBoard)
      if (!placed) return prevBoard // column full

      // Find the row where the disk landed
      const row = tempBoard[col].lastIndexOf(currentPlayer)

      // Check for win/draw
      const result = checkWin(col, row, currentPlayer, tempBoard)
      if (Array.isArray(result)) {
        setGameResult({ winner: currentPlayer, type: "connect" })
        setWinningCells(result)
        incrementScore(currentPlayer)
      } else if (result === "DRAW") {
        setGameResult({ winner: null, type: "draw" })
      } else {
        // Switch player
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
      }
      return tempBoard
    })
  }, [currentPlayer, gameResult, isPaused, incrementScore])

  // CPU move logic
  useEffect(() => {
    if (
      isPlaying &&
      gameMode === "vsCPU" &&
      currentPlayer === 2 &&
      !gameResult &&
      !isPaused
    ) {
      const timer = setTimeout(() => {
        const bestCol = getBestMove(board, 2)
        addDisk(bestCol)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [board, currentPlayer, gameMode, gameResult, isPaused, isPlaying, addDisk])

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
        gameMode,
        setGameMode,
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
