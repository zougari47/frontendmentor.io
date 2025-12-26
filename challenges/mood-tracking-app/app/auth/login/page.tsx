"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { login } from "../action"

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email too short" })
    .max(255, { message: "Email too long" }),
  password: z.string(),
})

export default function SignUpPage() {
  const [flash, setFlash] = useState<null | string>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "yt.4inform@gmail.com",
      password: "@Aa12345",
    },
  })

  useEffect(() => {
    const match = document.cookie.match(/(^| )flash=([^;]+)/)

    if (match) {
      const message = decodeURIComponent(match[2])
      setFlash(message)

      document.cookie = "flash=; Max-Age=0; path=/;"
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      formData.append("email", values.email)
      formData.append("password", values.password)

      const result = await login(formData)
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-neutral-0 txt-preset-6-regular rounded-16 py-500 px-200 md:px-400 mx-auto w-[90%] max-w-[530px] text-neutral-600 shadow-[0_8px_16px_0_rgba(32,37,41,0.08)]">
      <div className="space-y-100">
        <h1 className="txt-preset-3 text-neutral-900">Welcome back!</h1>
        <p className="">Log in to continue tracking your mood and sleep</p>
        {flash && (
          <p className="text-preset-3 rounded bg-emerald-100 p-4 text-green-800">
            {flash}
          </p>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-400 space-y-250"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-100">
                <FormLabel className="block text-neutral-900">Email</FormLabel>
                <FormControl>
                  <Input
                    className="mb-075"
                    placeholder="example@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-100">
                <FormLabel className="block text-neutral-900">
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-250">
            <Button className="w-full">Log In</Button>
            <p className="text-center">
              Haven't go an account{" "}
              <Link className="text-blue-600" href="/auth/signup">
                Sign up.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
