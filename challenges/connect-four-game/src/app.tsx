import { useGame } from "@/context/GameContext"

import { MainMenu } from "@/components/main-menu"

export function App() {
  const { isPlaying } = useGame()
  return !isPlaying ? <MainMenu /> : <div>game</div>
}
