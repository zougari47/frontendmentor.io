import { createContext, useContext, useState, type ReactNode } from "react"

import { createBoard } from "@/lib/core/game"
import type { Board } from "@/lib/core/types"

interface GameState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  board: Board
  setBoard: (board: Board) => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [board, setBoard] = useState(() => createBoard())

  return (
    <GameContext.Provider value={{ isPlaying, setIsPlaying, board, setBoard }}>
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
