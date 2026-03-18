import { useEffect, useState } from "react"
import { useGame } from "@/GameContext"

import { cn } from "@/lib/utils"

function TurnCard() {
  const { currentPlayer, isPaused } = useGame()
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (isPaused) return // stop timer when paused

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          const winner = currentPlayer === 1 ? 2 : 1
          console.log(`Winner is Player ${winner}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer) // cleanup on unmount or change
  }, [currentPlayer, isPaused])

  return (
    <div
      className={cn(
        "relative mx-auto w-fit -translate-y-5 p-0 text-center md:-translate-y-8 xl:-translate-y-14",
        currentPlayer === 1 ? "text-white" : "text-black"
      )}
    >
      <span className="text-heading-xs top-10.25 absolute block w-full uppercase">
        Player {currentPlayer}&apos;s turn
      </span>
      <span className="text-heading-l top-15.75 absolute left-1/2 mx-auto block -translate-x-1/2">
        {timeLeft}s
      </span>

      <svg
        width={197}
        height={165}
        viewBox="0 0 197 165"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_5_3076)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 54.5959C3 46.549 7.82258 39.2858 15.2389 36.1632L90.2793 4.56722C95.2186 2.48754 100.786 2.47716 105.733 4.53839L181.692 36.1882C189.145 39.2936 194 46.5757 194 54.6497V131.316C194 142.362 185.046 151.316 174 151.316H23C11.9543 151.316 3 142.362 3 131.316V54.5959Z"
            fill={`var(--color-${currentPlayer === 1 ? "red" : "yellow"})`}
          />
          <path
            d="M89.6973 3.18457C95.0068 0.948996 100.992 0.937618 106.31 3.15332L182.27 34.8037C190.281 38.142 195.5 45.9701 195.5 54.6494V131.316C195.5 143.191 185.874 152.816 174 152.816H23C11.1259 152.816 1.5 143.191 1.5 131.316V54.5957C1.50008 45.9454 6.68479 38.1371 14.6572 34.7803L89.6973 3.18457Z"
            stroke="black"
            strokeWidth={3}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_5_3076"
            x={0}
            y={0}
            width={197}
            height={164.316}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={10} />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_5_3076"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_5_3076"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-dark-purple min-h-57.75 md:min-h-48.5 w-screen flex-1 rounded-t-[60px] xl:min-h-40">
      <TurnCard />
    </footer>
  )
}
