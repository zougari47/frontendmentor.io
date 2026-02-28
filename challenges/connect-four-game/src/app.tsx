import { useGame } from "@/GameContext"

import { GameLayout } from "@/components/game-layout"
import { MainMenu } from "@/components/main-menu"

export function App() {
  const { isPlaying } = useGame()
  return !isPlaying ? <MainMenu /> : <GameLayout />
}
