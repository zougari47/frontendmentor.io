import { redirect } from "next/navigation"
import { Mood } from "@/schemas/mood"

import { createClient } from "@/lib/supabase/server"
import { MoodDialog } from "@/components/dialogs/mood"
import { Greeting } from "@/components/gretting"
import { Header } from "@/components/header"
import { Statistics } from "@/components/statistics"

// import { Statistics } from "@/components/statistics"

export default async function DashboardPage() {
  const FORTNIGHT_IN_MS = 14 * 24 * 60 * 60 * 1000
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("name, avatar_url, moods (*)")
    .eq("id", user?.id)
    .gt(
      "moods.created_at",
      new Date(Date.now() - FORTNIGHT_IN_MS).toISOString()
    )
    .single()

  const moods: Mood[] = (data?.moods || []).map((m) => ({
    mood: m.mood_level ?? 0,
    emotions: (m.feelings as any) ?? [],
    dayDescription: m.journal ?? "",
    sleepHours: m.sleep_hours ?? 0,
  }))

  const dashboardData = {
    ...data,
    email: user?.email,
    moods,
  }

  if (error) return <div>Error {error.message}</div>

  return (
    <div className="px-200 md:px-400 xl:mx-auto xl:w-[1170px] xl:px-0">
      <Header
        name={dashboardData.name!}
        email={dashboardData.email!}
        avatarUrl={dashboardData.avatar_url}
      />

      <Greeting name={dashboardData.name!} />
      <MoodDialog />
      <Statistics moods={data?.moods} />
    </div>
  )
}
