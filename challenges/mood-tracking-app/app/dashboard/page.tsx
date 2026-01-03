import { redirect } from "next/navigation"
import { Mood } from "@/schemas/mood"

import { TEN_DAYS_MS } from "@/lib/constants"
import { createClient } from "@/lib/supabase/server"
import { MoodDialog } from "@/components/dialogs/mood"
import { Greeting } from "@/components/gretting"
import { Header } from "@/components/header"
import { Statistics } from "@/components/statistics"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const startDate = new Date(Date.now() - TEN_DAYS_MS)
  const startDateStr = startDate.toISOString().split("T")[0] // "YYYY-MM-DD"

  const { data, error } = await supabase
    .from("profiles")
    .select("name, avatar_url, moods (*)")
    .eq("id", user?.id)
    .gte("moods.created_at::date", startDateStr)
    .single()

  console.table(
    data?.moods?.map((m) => ({
      date: new Date(m.created_at)
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        .replace(" ", "")
        .toLowerCase(),
      mood_level: m.mood_level,
      sleep_hours: m.sleep_hours,
    }))
  )

  const dashboardData = {
    ...data,
    email: user?.email,
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
