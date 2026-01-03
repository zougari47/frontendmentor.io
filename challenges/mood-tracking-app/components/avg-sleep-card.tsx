import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"

import { sleepRangeBounds, sleepRanges } from "@/lib/constants"
import { cn } from "@/lib/utils"

import { PatternSVG } from "./icons/pattern"
import { SleepIcon } from "./icons/sleep"

interface SleepCardProps {
  lastAvg: number | null
  prevAvg: number | null
}

export function AvgSleepCard({ lastAvg, prevAvg }: SleepCardProps) {
  const title =
    lastAvg === null
      ? "Not enough data yet!"
      : sleepRanges[
          sleepRangeBounds.findIndex(
            ([min, max]) => lastAvg >= min && lastAvg <= max
          )
        ]
  const Icon = lastAvg === null ? null : SleepIcon

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
    <div className="grid grid-rows-[auto_1fr] lg:flex-1">
      <h2 className="txt-preset-5 mb-150 text-neutral-900">
        <span>Average Sleep</span>
        <span className="txt-preset-7 text-neutral-600">
          {" "}
          (Last 5 check-ins)
        </span>
      </h2>

      <div
        className={cn(
          "rounded-20 px-200 py-250 space-y-150 relative z-50 lg:flex lg:flex-col lg:justify-around",
          lastAvg ? "bg-blue-600" : "bg-blue-100"
        )}
      >
        <PatternSVG className="absolute right-0 top-0 h-full w-auto" />
        <h3 className="gap-150 [&_svg]:w-300 [&_svg]:h-300 flex items-center">
          {Icon && <Icon />}
          <span
            className={cn(
              "txt-preset-4",
              lastAvg ? "text-neutral-0" : "text-neutral-900"
            )}
          >
            {title} Hours
          </span>
        </h3>
        <p
          className={cn(
            "gap-150 lg:pr-600 flex items-center",
            lastAvg ? "text-neutral-0" : "text-neutral-900"
          )}
        >
          {trend == "up" && <ArrowUpRight size={24} />}
          {trend == "same" && <ArrowRight size={24} />}
          {trend == "down" && <ArrowDownRight size={24} />}
          <span className="txt-preset-7">
            {trend
              ? `${trendLabel} the previous 5 check-ins`
              : "Track 5 nights to view average sleep."}
          </span>
        </p>
      </div>
    </div>
  )
}
