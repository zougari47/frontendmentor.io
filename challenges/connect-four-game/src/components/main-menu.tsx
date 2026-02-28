import { useState } from "react"
import { useGame } from "@/GameContext"

import { cn } from "@/lib/utils"
import { Button, ButtonWithIcon, CheckButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo, PlayVsPlayer } from "@/components/ui/icons"

export function MainMenu() {
  const [showRules, setShowRules] = useState(false)
  const { setIsPlaying } = useGame()

  return (
    <main
      className={cn(
        "bg-purple flex h-screen w-screen items-center justify-center",
        !showRules && "md:bg-dark-purple"
      )}
    >
      {showRules ? (
        <GameRules close={() => setShowRules(false)} />
      ) : (
        <div
          className={cn(
            "max-w-120 bg-purple w-full px-5",
            "md:border-3 md:pt-17.5 md:pb-15 md:px-10",
            "md:rounded-[40px] md:border-black md:shadow-[0_10px_0_0_var(--color-black)]"
          )}
        >
          <Logo className="mb-19.75 mx-auto block" />
          <nav className="gap-7.5 mx-auto grid justify-items-center">
            <ButtonWithIcon
              variant="yellow"
              icon={<PlayVsPlayer />}
              onClick={() => setIsPlaying(true)}
            >
              play vs player
            </ButtonWithIcon>
            <Button
              className="ps-5 text-start"
              onClick={() => setShowRules(true)}
            >
              Game Rules
            </Button>
          </nav>
        </div>
      )}
    </main>
  )
}

const rules = [
  "Red goes first in the first game.",
  "Players must alternate turns, and only one disc can be dropped in each turn.",
  "The game ends when there is a 4-in-a-row or a stalemate.",
  "The starter of the previous game goes second on the next game.",
]

function GameRules({ close }: { close: () => void }) {
  return (
    <Card className="px-8.5 pb-13.5 pt-7.5 relative w-11/12 bg-white text-black">
      <h1 className="text-heading-l mb-7.25 text-center">RULES</h1>

      <h2 className="text-heading-s text-purple mb-4">OBJECTIVE</h2>
      <p className="mb-8.25 text-black/66">
        Be the first player to connect 4 of the same colored discs in a row
        (either vertically, horizontally, or diagonally).
      </p>

      <h2 className="text-heading-s text-purple mb-4">HOW TO PLAY</h2>
      <ol className="grid gap-2.5">
        {rules.map((rule, index) => (
          <li key={rule.split(" ")[0]} className="gap-4.75 flex">
            <span className="text-heading-xs block">{index + 1}</span>
            <span className="text-black/66 block">{rule}</span>
          </li>
        ))}
      </ol>

      <CheckButton
        onClick={() => close()}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
      />
    </Card>
  )
}
