import { Button } from "./components/ui/button"
import { IconCheck, IconCPU, IconPlayer } from "./components/ui/icons"

export function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8">
      <div className="flex w-full max-w-md flex-col gap-6">
        <h2 className="text-heading-s text-white">Primary Variants</h2>

        <Button variant="primary-red" icon={<IconCPU />}>
          Play vs CPU
        </Button>

        <Button variant="primary-yellow" icon={<IconPlayer />}>
          Play vs Player
        </Button>

        <Button variant="primary-white">Game Rules</Button>
      </div>

      <div className="flex w-full max-w-md flex-col gap-6">
        <h2 className="text-heading-s text-white">Secondary Variants</h2>
        <div className="flex gap-4">
          <Button variant="secondary-purple">Menu</Button>
          <Button variant="secondary-red">Restart</Button>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <h2 className="text-heading-s text-white">Icon Variant</h2>
        <Button variant="icon-checkmark" icon={<IconCheck />} />
      </div>
    </div>
  )
}
