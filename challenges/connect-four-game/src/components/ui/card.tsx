import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type CardProp = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ children, className }: CardProp) {
  return (
    <div
      className={cn(
        "border-3 max-w-120 rounded-[40px] border-black shadow-[0_10px_0_0_var(--color-black)]",
        className
      )}
    >
      {children}
    </div>
  )
}
