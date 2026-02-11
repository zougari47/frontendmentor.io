import { createContext, useContext, useState, type ReactNode } from "react"

interface GameState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

const GameContext = createContext<GameState | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <GameContext.Provider value={{ isPlaying, setIsPlaying }}>
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
