import { Happy as MonochromeHappy } from "@/components/icons/moods/black-white/happy"
import { Neutral as MonochromeNeutral } from "@/components/icons/moods/black-white/neutral"
import { Sad as MonochromeSad } from "@/components/icons/moods/black-white/sad"
import { VeryHappy as MonochromeVeryHappy } from "@/components/icons/moods/black-white/very-happy"
import { VerySad as MonochromeVerySad } from "@/components/icons/moods/black-white/very-sad"
import { Happy as ColoredHappy } from "@/components/icons/moods/colored/happy"
import { Neutral as ColoredNeutral } from "@/components/icons/moods/colored/neutral"
import { Sad as ColoredSad } from "@/components/icons/moods/colored/sad"
import { VeryHappy as ColoredVeryHappy } from "@/components/icons/moods/colored/very-happy"
import { VerySad as ColoredVerySad } from "@/components/icons/moods/colored/very-sad"

export const MS_PER_DAY = 24 * 60 * 60 * 1000
export const FORTNIGHT_IN_MS = 14 * MS_PER_DAY

export const emotions = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
] as const

export const sleepHours = [1.0, 3.5, 5.5, 7.5, 10.0] as const

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

export const MoodIconsColor = [
  ColoredVerySad,
  ColoredSad,
  ColoredNeutral,
  ColoredHappy,
  ColoredVeryHappy,
] as const

export const MoodIconsMono = [
  MonochromeVerySad,
  MonochromeSad,
  MonochromeNeutral,
  MonochromeHappy,
  MonochromeVeryHappy,
] as const

export const MoodBgColors = [
  "bg-red-300",
  "bg-indigo-200",
  "bg-blue-300",
  "bg-green-300",
  "bg-amber-300",
]
