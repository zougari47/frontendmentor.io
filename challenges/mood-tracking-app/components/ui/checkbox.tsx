"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as LabelPrimitive from "@radix-ui/react-label"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Label } from "./label"

function Checkbox({
  className,
  label,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { label: string }) {
  return (
    <Label className="bg-neutral-0 gap-100 rounded-10 px-200 py-150 flex border border-blue-100 has-[[data-state=checked]]:border-blue-600">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "rounded-4 h-200 w-200 relative block overflow-hidden border-2 border-blue-200 aria-checked:border-blue-600",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className=""
        >
          <CheckIcon className="text-neutral-0 absolute inset-0 h-full w-full bg-blue-600" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className="txt-preset-6-regular block text-neutral-900">
        {label}
      </span>
    </Label>
  )
}

export { Checkbox }
