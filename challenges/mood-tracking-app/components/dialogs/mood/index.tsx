"use client"

import { useEffect, useState } from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { stepTitles } from "./constants"
import { MoodForm } from "./form"
import ProgressBar from "./progress-bar"

export function MoodDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  useEffect(() => {
    if (!open) setStep(1)
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        console.log(isOpen ? "opened" : "closed")
        setOpen(isOpen)
      }}
    >
      <Button onClick={() => setOpen(true)} className="mx-auto block">
        Log today's mood
      </Button>

      <DialogContent
        className="bg-gradient"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="gap-300 flex flex-col text-left">
          <DialogTitle className="mb-0">
            {stepTitles[step - 1].tiltle}
          </DialogTitle>
          <ProgressBar step={step} />
          <p className="txt-preset-3-mobile text-neutral-900">
            {stepTitles[step - 1].subTitle}
          </p>
        </DialogHeader>

        <MoodForm
          step={step}
          setStep={setStep}
          closeModal={() => setOpen(false)}
        />

        <button
          onClick={() => setOpen(false)}
          data-slot="dialog-close"
          className="absolute right-4 top-4 text-neutral-300 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}
