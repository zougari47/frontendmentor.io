import { z } from "zod"

import { emotions, sleepHours } from "@/lib/constants"

export const moodSchema = z.object({
  mood: z.number({
    message: "Please select a mood before continuing.",
  }),

  emotions: z
    .array(z.enum(emotions))
    .min(1, "You have to select at least one.")
    .max(3, "You can only select a maximum of 3 tags."),

  dayDescription: z
    .string("Please describe your day before continuing.")
    .max(150, "150 Characters is the max length.")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 5,
      "Please write a few words about your day before continuing."
    ),

  sleepHours: z
    .number({ message: "Please select a valid sleep hour option" })
    .refine((val) => sleepHours.includes(val as any), {
      message: "Please select a valid sleep hour option",
    }),
})

export type Mood = z.infer<typeof moodSchema>
