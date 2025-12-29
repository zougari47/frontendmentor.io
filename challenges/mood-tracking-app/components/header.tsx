"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDown, LogOut, Settings } from "lucide-react"

import { supabase } from "@/lib/supabase/client"

import { SettingsDialog } from "./dialogs/settings"

interface HeaderProps {
  email: string
  name: string
  avatarUrl: string | null | undefined
}

export function Header({ email, name, avatarUrl }: HeaderProps) {
  const [open, setOpen] = useState(false) // state for setting dialog
  const router = useRouter()

  return (
    <header className="pt-400 flex items-center justify-between">
      <img src="/logo.svg" className="h-auto w-[177px]" />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="gap-125 flex cursor-pointer items-center">
          <img
            src={avatarUrl || "/placeholder.png"}
            alt={name}
            className="w-500 aspect-square rounded-full"
          />
          <ChevronDown className="text-neutral-900" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            data-slot="dropdown-menu-content"
            className="px-200 py-150 md:mr-400 md:mt-125 bg-neutral-0 rounded-8 shadow-[0px_5px_8px_0px_rgba(33,33,77,0.16)] md:w-[200px] xl:mr-24"
          >
            <DropdownMenu.Label className="outline-none">
              <h4 className="txt-preset-6 text-neutral-900">{name}</h4>
              <span className="txt-reset-7 text-neutral-300">{email}</span>
            </DropdownMenu.Label>

            <DropdownMenu.Separator className="my-150 h-[1px] bg-blue-100" />

            <DropdownMenu.Item
              onSelect={() => setOpen(true)}
              className="txt-preset-7 mb-150 flex cursor-pointer items-center gap-[10px] text-neutral-900 outline-none"
            >
              <Settings className="text-neutral-900" width={16} height={16} />
              <span>Settings</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={async () => {
                const { error } = await supabase.auth.signOut()
                if (!error) router.push("/auth/login")
              }}
              className="txt-preset-7 flex cursor-pointer items-center gap-[10px] text-neutral-900 outline-none"
            >
              <LogOut className="text-neutral-900" width={16} height={16} />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <SettingsDialog
        name={name}
        open={open}
        setOpen={setOpen}
        avatarUrl={avatarUrl || null}
      />
    </header>
  )
}
