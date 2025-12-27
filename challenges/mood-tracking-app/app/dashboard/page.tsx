import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return <p>kkkj</p>

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name, avatar_url, moods (*)")
    .eq("id", user?.id)
    .single()

  const dashboardData = {
    email: user?.email,
    ...profile,
  }

  if (error) return <div>Error loading dashboard</div>

  return (
    <div className="px-200 md:px-400 xl:mx-auto xl:w-[1170px] xl:px-0">
      <Header
        name={dashboardData.name!}
        email={dashboardData.email!}
        avatarUrl={dashboardData.avatar_url}
      />
    </div>
  )
}
