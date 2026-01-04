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
export const TEN_DAYS_MS = 10 * MS_PER_DAY

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
export const sleepRanges = ["0-2", "3-4", "5-6", "7-8", "+9"] as const
export const sleepRangeBounds = [
  [0, 2],
  [3, 4],
  [5, 6],
  [7, 8],
  [9, 10],
] as const
/* height of pillars per sleep hours in the chart  */
export const sleepPxValues = [
  "h-[41px]",
  "h-[95px]",
  "h-[148px]",
  "h-[200px]",
  "h-[253px]",
] as const

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
] as const
export const moodLabels = [
  "Very Sad",
  "Sad",
  "Neutral",
  "Happy",
  "Very Happy",
] as const

export const moodQuotes = [
  [
    // Very Sad (0)
    "Even the darkest night will end, and the sun will rise.",
    "In the middle of winter, there is an invincible summer within.",
    "Sometimes the worst place to be is in one’s own head.",
    "Fall seven times, stand up eight.",
    "All things break, and all things can be mended.",
  ],
  [
    // Sad (1)
    "It does not matter how slowly the journey goes as long as it does not stop.",
    "The best way out is always through.",
    "Thoughts do not have to be controlled; they simply do not need to be in control.",
    "The wound is the place where the light can enter.",
    "Just when the caterpillar thought the world was over, it became a butterfly.",
  ],
  [
    // Neutral (2)
    "The waves cannot be stopped, but it is possible to learn how to surf.",
    "The present moment is filled with joy and happiness for those who pay attention.",
    "Life is not made unbearable by circumstances, but by a lack of meaning and purpose.",
    "Not every thought that appears needs to be believed.",
    "Unsolved questions in the heart can be met with patience and gentle curiosity.",
  ],
  [
    // Happy (3)
    "Happiness can be found even in very dark times by remembering to turn on the light.",
    "Joy and happiness are available in the present moment to those who are attentive.",
    "Strength can be seen in having survived every difficult day so far.",
    "Life is partly what happens and mostly how one responds to it.",
    "The sun starts weak at dawn and gathers strength as the day goes on.",
  ],
  [
    // Very Happy (4)
    "What lies within a person matters more than what lies behind or ahead.",
    "It is never too late to become what one might have been.",
    "Greatness is not in never falling, but in rising every time after a fall.",
    "The present moment is the only time truly under one’s influence.",
    "Life is not about waiting for the storm to pass but learning to dance in the rain.",
  ],
]
