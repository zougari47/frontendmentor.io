"use client"

import { useRef } from "react"
import { profileSchema } from "@/schemas/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/app/actions/update-profile"

interface SettingsDialogProps {
  name: string
  open: boolean
  avatarUrl: string | null
  setOpen: (open: boolean) => void
}

export function SettingsDialog({
  name,
  avatarUrl,
  open,
  setOpen,
}: SettingsDialogProps) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: name,
      avatar: avatarUrl,
    },
  })
  const { isSubmitting } = form.formState
  const syncAvatar = form.watch("avatar")

  function getAvatarPreview(): string {
    switch (true) {
      case !!syncAvatar &&
        typeof syncAvatar !== "string" &&
        ["image/png", "image/jpeg"].includes(syncAvatar.type):
        return URL.createObjectURL(syncAvatar)
      case !!avatarUrl:
        return avatarUrl
      default:
        return "/placeholder.png"
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await updateProfile(values)

      if (!error) setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
          <DialogDescription>
            Personalize your account with your name and photo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-400 space-y-250"
            id="update-profile"
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
              <img
                src={getAvatarPreview()}
                alt="Your image"
                className="aspect-square h-16 w-16 rounded-full object-cover"
              />
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
                          }}
                        />
                        <FormMessage className="mt-100" />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
          </form>
        </Form>
        <DialogFooter className="space-y-250">
          <Button
            form="update-profile"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
