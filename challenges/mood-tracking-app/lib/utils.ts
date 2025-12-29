import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Happy } from "@/components/icons/mood/happy"
import { Neutral } from "@/components/icons/mood/neutral"
import { Sad } from "@/components/icons/mood/sad"
import { VeryHappy } from "@/components/icons/mood/very-happy"
import { VerySad } from "@/components/icons/mood/very-sad"

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

export const MoodIconsColor = [VerySad, Sad, Neutral, Happy, VeryHappy] as const
