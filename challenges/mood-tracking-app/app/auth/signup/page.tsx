"use client"

import { useState } from "react"
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

import { signup } from "../action"
import { signupSchema } from "../schema"

export default function SignUpPage() {
  const [error, setError] = useState<null | string>(null)
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    const { error } = await signup(values)
    if (error) setError(error)
  }

  return (
    <div className="bg-neutral-0 txt-preset-6-regular rounded-16 py-500 px-200 md:px-400 mx-auto w-[90%] max-w-[530px] text-neutral-600 shadow-[0_8px_16px_0_rgba(32,37,41,0.08)]">
      <div className="space-y-100">
        <h1 className="txt-preset-3 text-neutral-900">Create an account</h1>
        <p>Join to track your daily mood and sleep with ease.</p>
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
              Sign Up
            </Button>
            <p className="text-center">
              Already got an account?{" "}
              <Link className="text-blue-600" href="/auth/login">
                Log in.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
