import { Tables } from "@/supabase/types"

import {
  MoodIconsColor,
  moodLabels,
  sleepHours,
  sleepRanges,
} from "@/lib/constants"
import { cn, getDailyRandomQuote } from "@/lib/utils"

import { QuoteIcon } from "./icons/quote"
import { SleepIcon } from "./icons/sleep"
import { StarsIcons } from "./icons/stars"
import { Card } from "./ui/card"

interface TodayMoodProps {
  mood: Tables<"moods">
  userId: string
}

export function TodayMood({ mood, userId }: TodayMoodProps) {
  return (
    <div className="gap-250 lg:gap-400 flex flex-col lg:flex-row">
      {/* mood */}
      <Card className="md:px-400 px-200 py-400 gap-400 grid overflow-hidden shadow-[0_0_20px_0_rgba(1,5,39,0.08)] md:grid-cols-2 md:grid-rows-2">
        <h2 className="text-center md:col-start-1 md:row-start-1 md:text-left">
          <span className="txt-preset-3 block text-neutral-900/70">
            I'm feeling
          </span>
          <span className="txt-preset-2 text-neutral-900">
            {moodLabels[mood.mood_level]}
          </span>
        </h2>

        <div
          className={cn(
            "md:col-start-2 md:row-span-2",
            "[&_svg]:mx-auto [&_svg]:block [&_svg]:size-[200px]",
            "md:[&_svg]:ml-0 md:[&_svg]:size-[320px] md:[&_svg]:-translate-x-[10px] md:[&_svg]:translate-y-[63px]"
          )}
        >
          {(() => {
            const Icon = MoodIconsColor[mood.mood_level]
            return <Icon />
          })()}
        </div>

        <div className="space-y-200 md:col-start-1 md:row-start-2 md:content-end [&_svg]:mx-auto md:[&_svg]:mx-0">
          <QuoteIcon />
          <span className="txt-preset-6-italic block text-center text-neutral-900 md:text-left">
            "{getDailyRandomQuote(userId, mood.mood_level)}"
          </span>
        </div>
      </Card>

      {/* reflection of the day */}
      <div className="gap-250 flex flex-col">
        <Card className="p-250 space-y-200">
          <div className="gap-150 flex items-center [&_path]:fill-neutral-600 [&_svg]:size-[22px]">
            <SleepIcon />
            <span className="txt-preset-6 text-neutral-600">Sleep</span>
          </div>
          <span className="txt-preset-3 block text-neutral-900">
            {
              sleepRanges[
                sleepHours.findIndex((sh) => sh === mood?.sleep_hours)
              ]
            }
            {" hours"}
          </span>
        </Card>

        <Card className="p-250 gap-200 flex flex-1 flex-col">
          <div className="gap-150 flex items-center [&_path]:fill-neutral-600 [&_svg]:size-[22px]">
            <StarsIcons />
            <span className="txt-preset-6 text-neutral-600">
              Reflection of the day
            </span>
          </div>

          <span className="txt-preset-6 block min-h-[80px]">
            {mood.journal}
          </span>

          <div className="gap-150 mt-auto flex w-full flex-wrap">
            {mood.feelings.map((f) => (
              <span key={f} className="txt-preset-6-italic text-neutral-600">
                #{f}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
