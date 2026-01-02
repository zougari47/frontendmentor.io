import { createClient } from "@supabase/supabase-js"

import { emotions, sleepHours } from "@/lib/constants"

import { Database } from "./types"

const EMAIL = "track@mood.app"
const args = process.argv.slice(2)
const DAYS2SEED = parseInt(args[0]) || 14

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  let userId: null | string = null

  // create user if it's not already exist
  console.log("🔍 Checking if user already exists...")
  const {
    data: { users },
  } = await supabase.auth.admin.listUsers()
  const userExist = users.find((u) => u.email === EMAIL)

  if (userExist) {
    userId = userExist.id
    console.log("♻️ User already exists")
  } else {
    console.log("👤 User didn't exist yet, creating one... ")
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email: EMAIL,
        password: "password123",
        email_confirm: true,
      })

    if (authError) {
      console.error(authError.message)
      return
    }
    userId = authUser.user.id
    console.log("✅ User created successfully")
  }

  // update user profile we created it
  if (!userExist) {
    console.log("🆙 Updating user name & setting onboarded status...")
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        onboarded: true,
        name: "Med",
      })
      .eq("id", userId)

    if (profileError) {
      console.error(profileError.message)
      return
    }
    console.log("💎 User profile update successfully")
  }

  // delete prv moods if user already exist
  if (userExist) {
    console.log("🗑️ Deleting all previous user moods...")

    const { error: deleteError } = await supabase
      .from("moods")
      .delete()
      .eq("user_id", userExist.id)

    if (deleteError) {
      console.error(deleteError.message)
      return
    } else {
      console.log("🧹 Previous moods deleted successfully")
    }
  }

  // seed random moods
  const randomMoodsData = Array.from({ length: DAYS2SEED }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (i + 1))

    const shuffled = [...emotions].sort(() => 0.5 - Math.random())
    const randomFeelings = shuffled.slice(0, Math.floor(Math.random() * 3) + 1)

    return {
      user_id: userId,
      mood_level: [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)],
      feelings: randomFeelings,
      journal: `Today I feel ${randomFeelings.join(", ")}`,
      sleep_hours: sleepHours[Math.floor(Math.random() * sleepHours.length)],
      created_at: date.toISOString(),
    }
  })

  const { error: moodError } = await supabase
    .from("moods")
    .insert(randomMoodsData)

  if (moodError) {
    console.error(moodError.message)
    return
  }
  console.log("🚀 Seeding successful ✅ Have fun 🎉")
}

main().catch((err) => {
  console.error("❌ Unexpected Error:", err.message)
  process.exit(1)
})
