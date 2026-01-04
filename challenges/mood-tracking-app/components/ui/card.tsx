import * as React from "react"

import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-neutral-0 rounded-16 border border-blue-100",
        className
      )}
      {...props}
    />
  )
}
