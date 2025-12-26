"use client"

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

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email too short" })
    .max(255, { message: "Email too long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password too long" })
    .regex(/[A-Z]/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must have at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must have at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must have at least one special character",
    }),
})

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "yt.4inform@gmail.com",
      password: "@Aa12345",
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      formData.append("email", values.email)
      formData.append("password", values.password)

      const result = await signup(formData)
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-neutral-0 txt-preset-6-regular rounded-16 py-500 px-200 md:px-400 mx-auto w-[90%] max-w-[530px] text-neutral-600 shadow-[0_8px_16px_0_rgba(32,37,41,0.08)]">
      <div className="space-y-100">
        <h1 className="txt-preset-3 text-neutral-900">Create an account</h1>
        <p className="">Join to track your daily mood and sleep with ease.</p>
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
