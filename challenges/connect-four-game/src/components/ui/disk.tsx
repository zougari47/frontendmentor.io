import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

interface DiskProps extends SVGProps<SVGSVGElement> {
  variant: "red" | "yellow"
  isWinning?: boolean
}

export function Disk({
  variant,
  isWinning = false,
  className,
  ...props
}: DiskProps) {
  const fill = variant === "red" ? "#EF4444" : "#FFCE67"

  return (
    <svg
      viewBox="0 0 70 75"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(isWinning && "scale-110 drop-shadow-lg", className)}
      {...props}
    >
      <circle cx={35} cy={35} r={35} fill="black" />
      <circle cx={35} cy={40} r={35} fill="black" />
      <g filter="url(#innerShadow)">
        <circle cx={35} cy={35} r={32} fill={fill} />
      </g>

      <defs>
        <filter
          id="innerShadow"
          x={3}
          y={3}
          width={64}
          height={64}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="bg" />
          <feBlend in="SourceGraphic" in2="bg" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={5} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend in2="shape" result="innerShadow" />
        </filter>
      </defs>
    </svg>
  )
}
