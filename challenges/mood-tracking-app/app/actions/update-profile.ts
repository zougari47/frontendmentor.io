"use server"

import { revalidatePath } from "next/cache"
import { profileSchema } from "@/schemas/profile"
import z from "zod"

import { createClient } from "@/lib/supabase/server"

export async function updateProfile({
  name,
  avatar,
}: z.infer<typeof profileSchema>) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return { error: "Unauthorized" }

  // validation
  const validatedFields = profileSchema.safeParse({ name, avatar })
  if (!validatedFields.success) return { error: validatedFields.error.message }

  let newAvatarUrl: string | null = null

  if (avatar && avatar instanceof File) {
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
    newAvatarUrl = `${data.publicUrl}?v=${Date.now()}`
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      name: validatedFields.data.name,
      ...(newAvatarUrl && { avatar_url: newAvatarUrl }), // update the image only if we get one
    })
    .eq("id", user.id)

  if (updateError) return { error: "Database update failed" }

  revalidatePath("/dashboard")
  return { success: true }
}
