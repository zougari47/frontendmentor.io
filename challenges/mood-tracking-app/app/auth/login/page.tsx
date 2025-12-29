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
import { loginSchema } from "../schema"

export default function SignUpPage() {
  const [flash, setFlash] = useState<null | string>(null)
  const [error, setError] = useState<null | string>(null)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting } = form.formState

  useEffect(() => {
    const match = document.cookie.match(/(^| )flash=([^;]+)/)

    if (match) {
      const message = decodeURIComponent(match[2])
      setFlash(message)

      document.cookie = "flash=; Max-Age=0; path=/;"
    }
  }, [])

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { error } = await login(values)

      if (error) setError(error.message)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-neutral-0 txt-preset-6-regular rounded-16 py-500 px-200 md:px-400 mx-auto w-[90%] max-w-[530px] text-neutral-600 shadow-[0_8px_16px_0_rgba(32,37,41,0.08)]">
      <div className="space-y-100">
        <h1 className="txt-preset-3 text-neutral-900">Welcome back!</h1>
        <p>Log in to continue tracking your mood and sleep</p>
        {flash && (
          <p className="text-preset-3 rounded bg-emerald-100 p-4 text-green-800">
            {flash}
          </p>
        )}
        {error && (
          <p className="text-preset-3 rounded bg-rose-100 p-4 text-red-800">
            {error}
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
                    disabled={isSubmitting}
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
                  <Input type="password" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-250">
            <Button disabled={isSubmitting} className="w-full">
              Log In
            </Button>
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
