"use server"

import { revalidatePath } from "next/cache"
import { moodSchema, type Mood } from "@/schemas/mood"

import { createClient } from "@/lib/supabase/server"

export async function insertMood(data: Mood) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return { error: "Unauthorized" }

  // validation
  const validatedFields = moodSchema.safeParse(data)
  if (!validatedFields.success) return { error: validatedFields.error.message }

  const {
    mood: mood_level,
    emotions: feelings,
    dayDescription: journal,
    sleepHours: sleep_hours,
  } = data

  const { error: insertError } = await supabase.from("moods").insert({
    mood_level,
    feelings,
    journal,
    sleep_hours,
    user_id: user.id,
  })

  if (insertError) return { error: insertError?.message }

  revalidatePath("/dashboard")

  return { success: true }
}
