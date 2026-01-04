"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"

import { loginSchema } from "./schema"

export async function login({ email, password }: z.infer<typeof loginSchema>) {
  const supabase = await createClient()

  const { error, data: _data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/dashboard")
}

export async function signup({ email, password }: z.infer<typeof loginSchema>) {
  const supabase = await createClient()
  const cookieStore = await cookies()

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { error }
  }

  cookieStore.set("flash", "Your account is created! You can login now!", {
    httpOnly: false,
    maxAge: 60,
  })
  redirect("/auth/login")
}
