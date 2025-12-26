"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const { error, data: _data } = await supabase.auth.signInWithPassword(data)

  console.log({ error, user: _data.user })

  if (error) {
    redirect("/error")
  }

  revalidatePath("/dashboard", "layout")
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  const cookieStore = await cookies()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/auth/login", "layout")
  cookieStore.set("flash", "Your account is created! You can login now!", {
    httpOnly: false,
    maxAge: 60,
  })
  redirect("/auth/login")
}
