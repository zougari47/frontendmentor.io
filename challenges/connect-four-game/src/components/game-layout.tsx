import { Board } from "./board"
import { Footer } from "./footer"
import { MenuDialog } from "./menu-dialog"
import { Score } from "./score"
import { MenuButton } from "./ui/button"
import { Logo } from "./ui/icons"

export function GameLayout() {
  return (
    <div className="bg-purple flex min-h-screen flex-col">
      <div className="md:w-158 w-83.75 mx-auto">
        <header className="py-12.5 flex items-center justify-between">
          <MenuDialog />
          <Logo className="size-10" />
          <MenuButton text="Restart" />
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
