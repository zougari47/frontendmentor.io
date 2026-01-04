import { redirect } from "next/navigation"

import { TEN_DAYS_MS } from "@/lib/constants"
import { createClient } from "@/lib/supabase/server"
import { isToday } from "@/lib/utils"
import { MoodDialog } from "@/components/dialogs/mood"
import { Greeting } from "@/components/gretting"
import { Header } from "@/components/header"
import { Statistics } from "@/components/statistics"
import { TodayMood } from "@/components/today-mood"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const startDate = new Date(Date.now() - TEN_DAYS_MS)

  const { data, error } = await supabase
    .from("profiles")
    .select("name, avatar_url, moods (*)")
    .eq("id", user?.id)
    .gte("moods.created_at::date", startDate.toISOString())
    .single()

  const dashboardData = {
    ...data,
    email: user?.email,
  }

  const todayMood =
    data?.moods?.find(({ created_at }) => isToday(created_at)) ?? null

  if (error) return <div>Error {error.message}</div>

  return (
    <div className="px-200 md:px-400 xl:mx-auto xl:w-[1170px] xl:px-0">
      <Header
        name={dashboardData.name!}
        email={dashboardData.email!}
        avatarUrl={dashboardData.avatar_url}
      />

      <Greeting name={dashboardData.name!} />
      {todayMood ? <TodayMood mood={todayMood} /> : <MoodDialog />}

      <Statistics moods={data?.moods} />
    </div>
  )
}
