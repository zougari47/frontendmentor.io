import {
  Button,
  ButtonWithIcon,
  CheckButton,
  MenuButton,
} from "@/components/ui/button"
import { PlayVsCPU, PlayVsPlayer } from "@/components/ui/icons"

export function App() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center gap-8 bg-white p-8">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Button>start game</Button>
        <Button variant="red">quit game</Button>
        <MenuButton />
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <ButtonWithIcon variant="yellow" icon={<PlayVsPlayer />}>
          play vs player
        </ButtonWithIcon>
        <ButtonWithIcon variant="red" icon={<PlayVsCPU />}>
          play vs cpu
        </ButtonWithIcon>
        <CheckButton />
      </div>
    </div>
  )
}
