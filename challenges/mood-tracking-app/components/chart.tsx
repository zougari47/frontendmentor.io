"use client"

import type { Tables } from "@/supabase/types"
import { useState } from "react"

import {
  MoodBgColors,
  MoodIconsColor,
  MoodIconsMono,
  MS_PER_DAY,
  moodLabels,
  sleepHours,
  sleepPxValues,
  sleepRanges,
} from "@/lib/constants"
import { cn, getDayStartUTC } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@/components/ui/popover"

import { SleepIcon } from "./icons/sleep"

interface ChartProps {
  moods: Tables<"moods">[]
}

function ChartPillar({ day }: { day: any }) {
  const [open, setOpen] = useState(false)
  
  const Icon =
    day.mood?.mood_level != null ? MoodIconsMono[day.mood.mood_level] : null

  const sleepIdx =
    day.mood?.sleep_hours != null
      ? sleepHours.findIndex((sh) => sh === day.mood?.sleep_hours)
      : -1

  const sleepRange =
    sleepIdx !== -1 ? sleepRanges[sleepIdx].replace("+9", "9+") : ""

  const ColoredIcon =
    day.mood?.mood_level != null ? MoodIconsColor[day.mood.mood_level] : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className={cn(
            "mt-auto w-full min-w-fit rounded-full pt-[5px]",
            "animate-grow origin-bottom [&_svg]:mx-auto [&_svg]:size-[30px] cursor-pointer",
            !day.mood && "h-[200px]",
            day.mood?.mood_level != null && MoodBgColors[day.mood?.mood_level],
            sleepIdx !== -1 && sleepPxValues[sleepIdx]
          )}
        >
          {Icon && <Icon />}
        </div>
      </PopoverTrigger>
      {day.mood && (
        <PopoverContent
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="z-50 w-[240px] rounded-16 bg-neutral-0 p-250 text-neutral-900 shadow-[0px_4px_7px_0px_rgba(33,33,77,0.16)] border border-blue-100 ring-0"
          side="left"
          sideOffset={12}
          align="start"
        >
          <PopoverArrow className="fill-neutral-0" width={16} height={8} />
          <div className="flex flex-col gap-200">
            {/* Mood */}
            <div className="flex flex-col gap-075">
              <span className="txt-preset-8 font-semibold text-neutral-600">Mood</span>
              <div className="flex items-center gap-100">
                {ColoredIcon && (
                  <span className="inline-flex size-[24px] shrink-0 [&_svg]:w-full [&_svg]:h-full">
                    <ColoredIcon />
                  </span>
                )}
                <span className="txt-preset-6 text-neutral-900">
                  {moodLabels[day.mood.mood_level]}
                </span>
              </div>
            </div>

            {/* Sleep */}
            <div className="flex flex-col gap-075">
              <span className="txt-preset-8 font-semibold text-neutral-600">Sleep</span>
              <span className="txt-preset-6 font-normal text-neutral-900">{sleepRange} hours</span>
            </div>

            {/* Reflection */}
            {day.mood.journal && (
              <div className="flex flex-col gap-075">
                <span className="txt-preset-8 font-semibold text-neutral-600">Reflection</span>
                <span className="txt-preset-7 font-normal text-neutral-900 leading-snug">
                  {day.mood.journal}
                </span>
              </div>
            )}

            {/* Tags */}
            {day.mood.feelings && day.mood.feelings.length > 0 && (
              <div className="flex flex-col gap-075">
                <span className="txt-preset-8 font-semibold text-neutral-600">Tags</span>
                <span className="txt-preset-7 font-normal text-neutral-900 leading-snug">
                  {day.mood.feelings.join(", ")}
                </span>
              </div>
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  )
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
                  <ChartPillar day={day} />
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
