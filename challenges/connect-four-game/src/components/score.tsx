import { useGame } from "@/GameContext"

import { cn } from "@/lib/utils"

import { Card } from "./ui/card"
import { PlayerOneScoreEmoji, PlayerTwoScoreEmoji } from "./ui/icons"

function ScoreCard({ player }: { player: 1 | 2 }) {
  const { score } = useGame()
  const isPlayerOne = player === 1
  return (
    <Card
      className={cn(
        "px-8.75 relative rounded-[20px] bg-white py-2.5 text-center",
        "md:flex md:items-center md:justify-between md:gap-5 md:text-left",
        "xl:pt-11.5 xl:px-6.75 xl:flex-col xl:gap-0",
        !isPlayerOne && "md:flex-row-reverse"
      )}
    >
      <h3 className="text-heading-xs xl:whitespace-nowrap">PLAYER {player}</h3>
      <span className="text-bold block text-[32px] leading-normal">
        {isPlayerOne ? score.playerOne : score.playerTwo}
      </span>
      {isPlayerOne ? (
        <PlayerOneScoreEmoji
          className={cn(
            "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "xl:left-1/2 xl:top-0"
          )}
        />
      ) : (
        <PlayerTwoScoreEmoji
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
            "xl:left-1/2 xl:top-0 xl:-translate-x-1/2"
          )}
        />
      )}
    </Card>
  )
}

export function Score() {
  return (
    <div
      className={cn(
        "mb-12.5 flex items-center justify-between",
        "xl:gap-188 xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:justify-around"
      )}
    >
      <ScoreCard player={1} />
      <ScoreCard player={2} />
    </div>
  )
}
