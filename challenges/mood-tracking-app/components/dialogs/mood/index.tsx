"use client"

import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { stepTitles, TOTAL_STEPS } from "./constants"
import { ChildHandle, MoodForm } from "./form"
import ProgressBar from "./progress-bar"

export function MoodDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const moodFormRef = useRef<ChildHandle>(null)

  async function handleContinue() {
    const isValid = await moodFormRef.current?.validateForm(step)

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS) as 1 | 2 | 3 | 4)
    }
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      setStep(1)
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="mx-auto block">Log today's mood</Button>
        </DialogTrigger>

        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader className="gap-300 flex flex-col text-left">
            <DialogTitle className="mb-0">
              {stepTitles[step - 1].tiltle}
            </DialogTitle>
            <ProgressBar step={step} />
            <p className="txt-preset-3-mobile text-neutral-900">
              {stepTitles[step - 1].subTitle}
            </p>
          </DialogHeader>

          <MoodForm ref={moodFormRef} step={step} />

          <DialogFooter>
            {step === TOTAL_STEPS ? (
              <Button type="submit" form="mood-form">
                Submit
              </Button>
            ) : (
              <Button onClick={handleContinue}>Continue</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
