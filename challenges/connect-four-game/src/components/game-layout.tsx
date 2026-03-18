import { useGame } from "@/GameContext"

import { Board } from "./board"
import { Footer } from "./footer"
import { MenuDialog } from "./menu-dialog"
import { Score } from "./score"
import { MenuButton } from "./ui/button"
import { Logo } from "./ui/icons"

export function GameLayout() {
  const { restart } = useGame()

  return (
    <div className="bg-purple flex min-h-screen flex-col">
      <div className="md:w-158 w-83.75 mx-auto">
        <header className="py-12.5 flex items-center justify-between">
          <MenuDialog />
          <Logo className="size-10" />
          <MenuButton text="Restart" onClick={restart} />
        </header>

        <main className="relative">
          <Score />
          <Board />
        </main>
      </div>

      <Footer />
    </div>
  )
}
