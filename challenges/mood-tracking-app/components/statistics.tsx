import { Tables } from "@/supabase/types"

import { MS_PER_DAY } from "@/lib/constants"
import { getAvg } from "@/lib/utils"

import { AvgMoodCard } from "./avg-mood-card"
import { AvgSleepCard } from "./avg-sleep-card"

type Mood = Tables<"moods">

interface StatisticsProps {
  moods: Mood[]
}

export function Statistics({ moods }: StatisticsProps) {
  const now = new Date()
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()

  const last5Days: Mood[] = []
  const prev5Days: Mood[] = []

  moods.forEach((mood) => {
    const moodDate = new Date(mood.created_at)
    const moodStart = new Date(
      moodDate.getFullYear(),
      moodDate.getMonth(),
      moodDate.getDate()
    ).getTime()

    const diffDays = (todayStart - moodStart) / MS_PER_DAY

    if (diffDays > 0 && diffDays <= 5) {
      last5Days.push(mood)
    } else if (diffDays > 5 && diffDays <= 10) {
      prev5Days.push(mood)
    }
  })

  // count avg mood & sleep
  const last5DaysSleepAvg = getAvg(last5Days, "sleep_hours")
  const prev5DaysSleepAvg = getAvg(prev5Days, "sleep_hours")
  const last5DaysMoodAvg = getAvg(last5Days, "mood_level")
  const prev5DaysMoodAvg = getAvg(prev5Days, "mood_level")

  console.log({
    last5DaysSleepAvg,
    prev5DaysSleepAvg,
    last5DaysMoodAvg,
    prev5DaysMoodAvg,
  })

  return (
    <section
      aria-labelledby="Statistics"
      className="mt-400 flex h-screen flex-col"
    >
      <div className="rounded-16 space-y-300 px-200 py-250 border border-blue-100 bg-neutral-100">
        <AvgMoodCard lastAvg={last5DaysMoodAvg} prevAvg={prev5DaysMoodAvg} />
        <AvgSleepCard lastAvg={last5DaysSleepAvg} prevAvg={prev5DaysSleepAvg} />
      </div>
    </section>
  )
}
