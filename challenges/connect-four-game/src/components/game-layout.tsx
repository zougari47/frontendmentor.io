import { Board } from "./board"
import { MenuButton } from "./ui/button"
import { Logo } from "./ui/icons"

export function GameLayout() {
  return (
    <div className="bg-purple min-h-screen w-screen">
      <div className="mx-auto max-w-5xl px-5">
        <header className="py-12.5 flex items-center justify-between">
          <MenuButton>Menu</MenuButton>
          <Logo className="size-10" />
          <MenuButton>Restart</MenuButton>
        </header>

        <main>
          <Board />
        </main>
      </div>
    </div>
  )
}
