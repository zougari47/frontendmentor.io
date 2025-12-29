export const moodLabels = [
  "Very Sad",
  "Sad",
  "Neutral",
  "Happy",
  "Very Happy",
] as const

export const sleepRanges = ["0-2", "3-4", "5-6", "7-8", "+9"] as const

export const TOTAL_STEPS = 4 as const

export const stepTitles = [
  {
    tiltle: "Log your mood",
    subTitle: "How was your mood today?",
  },
  {
    tiltle: "Log your mood",
    subTitle: "How was your mood today?",
  },
  {
    tiltle: "Log your mood",
    subTitle: "Write about your day...",
  },
  {
    tiltle: "Log your mood",
    subTitle: "How many hours did you sleep last night?",
  },
] as const
