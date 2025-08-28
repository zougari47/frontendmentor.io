"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function Tag() {
  return (
    <Label
      htmlFor="terms"
      className="gap-100 rounded-10 txt-preset-6-regular px-200 py-150 flex w-fit cursor-pointer items-center border-2 border-blue-100 has-[[aria-checked=true]]:border-blue-600"
    >
      <Checkbox id="terms" />
      Tag
    </Label>
  )
}
