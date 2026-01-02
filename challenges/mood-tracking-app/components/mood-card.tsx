import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"

import { cn, MoodBgColors, MoodIconsColor, MoodIconsMono } from "@/lib/utils"

// import { AvgCard } from "./avg-card"
import { moodLabels } from "./dialogs/mood/constants"
import { PatternSVG } from "./icons/pattern"

interface MoodCardProps {
  lastAvg: number | null
  prevAvg: number | null
}

export function MoodCard({ lastAvg, prevAvg }: MoodCardProps) {
  const title = lastAvg === null ? "Keep tracking!" : moodLabels[lastAvg]
  const Icon = lastAvg === null ? null : MoodIconsMono[lastAvg]

  const getTrend = () => {
    if (lastAvg === null || prevAvg === null) return null
    if (lastAvg > prevAvg) return "up"
    if (lastAvg < prevAvg) return "down"
    return "same"
  }

  const trend = getTrend()

  const trendLabel =
    trend === "up"
      ? "Increase from"
      : trend === "down"
        ? "Decrease from"
        : "Same as"

  return (
    <div>
      <h2 className="txt-preset-5 mb-150 text-neutral-900">
        <span>Average Mood</span>
        <span className="txt-preset-7 text-neutral-600">
          {" "}
          (Last 5 check-ins)
        </span>
      </h2>

      <div
        className={cn(
          "rounded-20 px-200 py-250 space-y-150 relative z-50",
          lastAvg ? MoodBgColors[lastAvg] : "bg-blue-100"
        )}
      >
        <PatternSVG className="absolute right-0 top-0 h-full w-auto" />
        <h3 className="gap-150 [&_svg]:w-300 [&_svg]:h-300 flex items-center">
          {Icon && <Icon />}
          <span className="txt-preset-4 text-neutral-900">{title}</span>
        </h3>
        <p className="gap-150 flex items-center">
          {trend == "up" && <ArrowUpRight size={24} />}
          {trend == "same" && <ArrowRight size={24} />}
          {trend == "down" && <ArrowDownRight size={24} />}
          <span className="txt-preset-7 text-neutral-900">
            {trend
              ? `${trendLabel} the previous 5 check-ins`
              : "Log 5 check-ins to see your average mood."}
          </span>
        </p>
      </div>
    </div>
  )
}

// {trend() === "up" && "Increase from"}
// {trend() === "down" && "Decrease from"}
// {trend() === "same" && "Same as"}
//
// {trend()
//   ? "The previous check-ins"
//   : "Track 5 nights to view average sleep."}
