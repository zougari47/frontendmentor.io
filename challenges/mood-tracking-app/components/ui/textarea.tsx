import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  length,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { length: number }) {
  return (
    <div>
      <textarea
        data-slot="textarea"
        placeholder="Today, I felt..."
        className={cn(
          "bg-neutral-0 rounded-10 px-200 py-150 block min-h-[150px] w-full border border-neutral-300 focus:outline focus:outline-blue-600",
          className
        )}
        {...props}
      />
      <span
        className={cn(
          "txt-preset-8 mt-100 block text-right",
          length > 150 ? "text-red-700" : "text-neutral-600"
        )}
      >
        {length}/150
      </span>
    </div>
  )
}

export { Textarea }
