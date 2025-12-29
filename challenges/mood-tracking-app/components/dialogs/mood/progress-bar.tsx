import * as ProgressPrimitive from "@radix-ui/react-progress"

interface ProgressBarProps {
  step: 1 | 2 | 3 | 4
}

export default function ProgressBar({ step }: ProgressBarProps) {
  const progressValue = (step / 4) * 100

  return (
    <ProgressPrimitive.Root
      value={progressValue}
      className="gap-200 flex w-full"
    >
      {[1, 2, 3, 4].map((stepNumber) => (
        <ProgressPrimitive.Indicator
          key={stepNumber}
          className={`h-1.5 flex-1 rounded-full ${
            stepNumber <= step ? "bg-blue-600" : "bg-blue-200"
          }`}
        />
      ))}
    </ProgressPrimitive.Root>
  )
}
