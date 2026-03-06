import { Board } from "./board"
import { MenuDialog } from "./menu-dialog"
import { Score } from "./score"
import { MenuButton } from "./ui/button"
import { Logo } from "./ui/icons"

export function GameLayout() {
  return (
    <div className="bg-purple min-h-screen w-screen">
      <div className="max-w-158 mx-auto w-10/12">
        <header className="py-12.5 flex items-center justify-between">
          <MenuDialog />
          <Logo className="size-10" />
          <MenuButton>Restart</MenuButton>
        </header>

        <main>
          <Score />
          <Board />
        </main>
      </div>
    </div>
  )
}
