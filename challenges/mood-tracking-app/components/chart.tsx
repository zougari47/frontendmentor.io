"use client"

import type { Tables } from "@/supabase/types"

import {
  MoodBgColors,
  MoodIconsMono,
  MS_PER_DAY,
  sleepHours,
  sleepPxValues,
  sleepRanges,
} from "@/lib/constants"
import { cn, getDayStartUTC } from "@/lib/utils"

import { SleepIcon } from "./icons/sleep"

interface ChartProps {
  moods: Tables<"moods">[]
}

export function Chart({ moods }: ChartProps) {
  const now = new Date()
  const todayStartUTC = getDayStartUTC(now)

  // 11 items (10 days ago + today)
  const days = Array.from({ length: 11 }).map((_, i) => {
    const timestamp = todayStartUTC - (10 - i) * MS_PER_DAY
    const date = new Date(timestamp)

    // Get the start of the day for comparison
    const dayStartUTC = getDayStartUTC(date)

    return {
      timestamp,
      month: date.toLocaleString("default", { month: "short" }),
      dayOfMonth: date.getDate(),
      mood:
        moods.find((m) => {
          const moodDate = new Date(m.created_at)
          return getDayStartUTC(moodDate) === dayStartUTC
        }) || null,
    }
  })

  return (
    <div className="bg-neutral-0 md:p-300 lg:p-400 rounded-16 px-200 py-250 w-full overflow-hidden border border-blue-100 lg:flex-1">
      <h2 className="txt-preset-3-mobile mb-250 md:txt-preset-3 text-neutral-900">
        Mood and sleep trends
      </h2>

      {/* Chart  */}
      <div className="gap-200 flex">
        {/* left */}
        <div className="gap-500 flex flex-col">
          {[...sleepRanges].reverse().map((h) => (
            <div
              key={`hours${h}`}
              className="txt-preset-9 [&_svg]:size-125 gap-075 flex items-center text-neutral-600 [&_path]:fill-neutral-600"
            >
              <SleepIcon />
              <span>{h} hours</span>
            </div>
          ))}
        </div>

        {/* right */}
        <div className="relative h-[306px] flex-1 overflow-hidden">
          {/* lines absolute */}
          <div className="gap-13 absolute z-20 flex h-full w-full flex-col pt-2">
            {sleepRanges.map((r) => (
              <div key={r} className="h-[1px] w-full bg-blue-100"></div>
            ))}
          </div>

          {/* scroll wrapper  */}
          <div
            className={cn(
              "relative z-40 h-full w-auto overflow-x-auto overflow-y-hidden"
            )}
          >
            {/* pillars + month/day */}
            <div className="gap-200 flex h-full min-w-fit">
              {days.map((day, i) => (
                <div
                  key={day.dayOfMonth}
                  className={cn(
                    "w-500 pt-auto flex flex-col gap-[11px]",
                    i > 0 && i < days.length - 1 && "mx-auto"
                  )}
                >
                  {/* pillars  */}
                  <div
                    className={cn(
                      "mt-auto h-[200px] w-full min-w-fit rounded-full pt-[5px]",
                      "animate-grow origin-bottom [&_svg]:mx-auto [&_svg]:size-[30px]",
                      day.mood?.mood_level != null &&
                        MoodBgColors[day.mood?.mood_level],
                      day.mood?.sleep_hours != null &&
                        sleepPxValues[
                          sleepHours.findIndex(
                            (sh) => sh === day.mood?.sleep_hours
                          )
                        ]
                    )}
                  >
                    {/* icon inside the pillar */}
                    {day.mood?.mood_level != null &&
                      (() => {
                        const Icon = MoodIconsMono[day.mood.mood_level]
                        return <Icon />
                      })()}
                  </div>
                  {/* month/day */}
                  <div className="space-y-075 text-center">
                    <span className="txt-preset-9 block text-neutral-600">
                      {days[i].month}
                    </span>
                    <span className="txt-preset-8 block text-neutral-900">
                      {days[i].dayOfMonth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
