"use client"

import { useRef, useState } from "react"
import { profileSchema } from "@/schemas/profile"
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

import { completeOnboarding } from "../actions/onboarding"

export default function OnboardingPage() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      avatar: null,
    },
  })
  const { isSubmitting } = form.formState

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result)
      reader.readAsDataURL(file)
      form.setValue("avatar", file)
      form.clearErrors("avatar")
    } else {
      setPreview(null)
      form.setValue("avatar", null)
    }
  }

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const formData = new FormData()
      formData.append("name", values.name)

      if (values.avatar) {
        formData.append("avatar", values.avatar)
      }

      await completeOnboarding(formData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="pt-1000">
      <img src="/logo.svg" alt="logo" className="mb-400 mx-auto block" />
      <div className="bg-neutral-0 txt-preset-6-regular rounded-16 py-500 px-200 md:px-400 mx-auto w-[90%] max-w-[530px] text-neutral-600 shadow-[0_8px_16px_0_rgba(32,37,41,0.08)]">
        <div className="space-y-100">
          <h1 className="txt-preset-3 text-neutral-900">
            Personalize your experience
          </h1>
          <p>Add your name and a profile picture to make Mood yours.</p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-400 space-y-250"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-100">
                  <FormLabel className="block text-neutral-900">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Appleseed"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-5">
              {preview ? (
                <img
                  src={preview as string}
                  alt="Preview"
                  className="aspect-square h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt="Your image"
                  className="aspect-square h-16 w-16 rounded-full"
                />
              )}
              <div>
                <span className="txt-preset-6-regular mb-1.5 block text-neutral-900">
                  Upload Image
                </span>
                <span className="txt-preset-7 mb-4 block text-neutral-600">
                  Max 250KB, PNG or JPEG
                </span>

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { ref, onChange } }) => {
                    const fileInputRef = useRef<HTMLInputElement>(null)
                    return (
                      <FormItem>
                        <Button
                          type="button"
                          variant="secondary"
                          className="block"
                          disabled={isSubmitting}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Upload
                        </Button>
                        <input
                          ref={(e) => {
                            ref(e)
                            fileInputRef.current = e
                          }}
                          type="file"
                          hidden
                          accept="image/png,image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            onChange(file)
                            handleFileChange(file)
                          }}
                        />
                        <FormMessage className="mt-100" />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>

            <div className="space-y-250">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Start Tracking
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}
