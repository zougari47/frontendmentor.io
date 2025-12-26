"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"

const onboardingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(64, "Name must be at most 64 characters"),
})

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return { error: "Unauthorized" }

  const name = formData.get("name")
  const avatar = formData.get("avatar") as File | null

  // validation
  const validatedFields = onboardingSchema.safeParse({ name })
  if (!validatedFields.success) return { error: "Invalid name" }

  let avatarUrl = null

  if (avatar && avatar.size > 0) {
    const fileExt = avatar.name.split(".").pop()
    const fileName = `${user.id}/${user.id}-avatar.${fileExt}`

    // upload/overide file
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar, {
        upsert: true,
      })

    if (uploadError) return { error: "Image upload failed" }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName)
    avatarUrl = data.publicUrl
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      name: validatedFields.data.name,
      avatar_url: avatarUrl,
      onboarded: true,
    })
    .eq("id", user.id)

  if (updateError) return { error: "Database update failed" }

  redirect("/dashboard")
}
