import { useGame } from "@/GameContext"
import { Dialog } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button, MenuButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function MenuDialog() {
  const {} = useGame()
  return (
    <Dialog.Root disablePointerDismissal>
      <Dialog.Trigger data-slot="dialog-trigger">
        <MenuButton>menu</MenuButton>
      </Dialog.Trigger>

      <Dialog.Portal data-slot="dialog-portal">
        <Dialog.Backdrop
          data-slot="dialog-overlay"
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 z-150 fixed inset-0 isolate bg-black/50 duration-100"
          )}
        />

        <Dialog.Popup
          data-slot="dialog-content"
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95",
            "z-200 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 duration-100"
          )}
        >
          <Card className="bg-purple w-83.75 py-7.5 gap-7.5 md:w-120 grid place-items-center px-5 md:px-10">
            <h2 className="text-heading-l text-center text-white md:pb-3.5">
              PAUSE
            </h2>
            <Button>continue game</Button>
            <Button>restart</Button>
            <Button variant="red">quit game</Button>
          </Card>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
