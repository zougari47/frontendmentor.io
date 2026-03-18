import { createContext, useContext, useState, type ReactNode } from "react"

import { addDiskToBoard, createBoard } from "@/lib/core/game"
import type { Board, Player } from "@/lib/core/types"

interface GameState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  board: Board
  setBoard: (board: Board) => void
  addDisk: (col: number, player: Player) => void
  currentPlayer: Player
  restart: () => void
  score: {
    playerOne: number
    playerTwo: number
  }
  isPaused: boolean
  pauseGame: () => void
  resumeGame: () => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState({
    playerOne: 0,
    playerTwo: 0,
  })
  const [board, setBoard] = useState(() => createBoard())
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1)
  const [isPaused, setIsPaused] = useState(false)

  function addDisk(col: number, player: Player) {
    const tempBoard = board.map((col) => [...col])
    addDiskToBoard(col, player, tempBoard)

    setBoard(tempBoard)
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1))
  }

  function restart() {
    setIsPlaying(false)
    setBoard(createBoard())
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
        setBoard,
        restart,
        score,
        addDisk,
        currentPlayer,
        isPaused,
        pauseGame,
        resumeGame,
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
