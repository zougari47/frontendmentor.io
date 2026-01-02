// we make this components only responsible for UI
import type { ComponentType } from "react"

import { PatternSVG } from "./icons/pattern"

interface AvgCardProps {
  title: string
  status: string | null
  // statusIcon: ElementType | null
  trend: string | null
  // trendIcon: ElementType | null

  statusIcon: ComponentType | null
  trendIcon: ComponentType | null
}

export function AvgCard({
  title,
  status,
  statusIcon: StatusIcon,
  trend,
  trendIcon: TrendIcon,
}: AvgCardProps) {
  return (
    <div>
      <h2 className="txt-preset-5 mb-150 text-neutral-900">
        <span>Average {title}</span>
        <span className="txt-preset-7 text-neutral-600">
          {" "}
          (Last 5 check-ins)
        </span>
      </h2>

      <div className="rounded-20 px-200 py-250 space-y-150 relative h-screen w-screen border !bg-green-300">
        {/* <PatternSVG className="absolute right-0 top-0 hidden h-full w-auto bg-red-300" /> */}
        <h3>
          {StatusIcon && <StatusIcon />}
          <span>{status}</span>
        </h3>
        <p>
          {TrendIcon && <TrendIcon />}
          {trend}
        </p>
      </div>
    </div>
  )
}
