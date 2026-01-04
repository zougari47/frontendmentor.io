import { Tables } from "@/supabase/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @returns the current date like this format "Sunday, January 4th, 2026"
 */
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

export function isToday(dateStr: string, referenceDate = new Date()): boolean {
  const d = new Date(dateStr)
  return (
    d.getUTCFullYear() === referenceDate.getUTCFullYear() &&
    d.getUTCMonth() === referenceDate.getUTCMonth() &&
    d.getUTCDate() === referenceDate.getUTCDate()
  )
}

export function getDayStartUTC(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

type Mood = Tables<"moods">
export function getAvg(data: Mood[], key: "mood_level" | "sleep_hours") {
  if (data.length < 5) return null
  const sum = data.reduce((acc, mood) => acc + mood[key], 0)
  return Math.round(sum / data.length)
}
