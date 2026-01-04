import { Tables } from "@/supabase/types"

import { MS_PER_DAY } from "@/lib/constants"
import { getAvg } from "@/lib/utils"

import { AvgMoodCard } from "./avg-mood-card"
import { AvgSleepCard } from "./avg-sleep-card"
import { Chart } from "./chart"

type Mood = Tables<"moods">

interface StatisticsProps {
  moods: Mood[]
}

export function Statistics({ moods }: StatisticsProps) {
  const now = new Date()
  const todayStartUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  )

  const last5Days: Mood[] = []
  const prev5Days: Mood[] = []

  moods.forEach((mood) => {
    const moodDate = new Date(mood.created_at)
    const moodStartUTC = Date.UTC(
      moodDate.getUTCFullYear(),
      moodDate.getUTCMonth(),
      moodDate.getUTCDate()
    )

    const diffDays = (todayStartUTC - moodStartUTC) / MS_PER_DAY

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

  return (
    <section
      aria-labelledby="Statistics"
      className="mt-400 gap-400 mb-1000 flex flex-col lg:flex-row"
    >
      <div className="rounded-16 space-y-300 px-200 py-250 bg-neutral-0 border border-blue-100 lg:flex lg:w-[370px] lg:flex-col">
        <AvgMoodCard lastAvg={last5DaysMoodAvg} prevAvg={prev5DaysMoodAvg} />
        <AvgSleepCard lastAvg={last5DaysSleepAvg} prevAvg={prev5DaysSleepAvg} />
      </div>

      <Chart moods={moods} />
    </section>
  )
}
