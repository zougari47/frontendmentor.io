import { Tables } from "@/supabase/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDate() {
  const today = new Date()
  const day = today.getDate()
  const ordinal =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th"
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
    .format(today)
    .replace(String(day), `${day}${ordinal}`)
  return formattedDate
}

type Mood = Tables<"moods">
export function getAvg(data: Mood[], key: "mood_level" | "sleep_hours") {
  if (data.length < 5) return null
  const sum = data.reduce((acc, mood) => acc + mood[key], 0)
  return Math.round(sum / data.length)
}

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
