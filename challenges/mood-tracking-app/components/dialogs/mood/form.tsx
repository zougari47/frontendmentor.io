"use client"

import { RefObject, useImperativeHandle } from "react"
import { emotions, moodSchema, sleepHours } from "@/schemas/mood"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { MoodIconsColor } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { moodLabels, sleepRanges } from "./constants"
import { RadioButton } from "./mood-radio-btn"

// import { Textarea } from "@/components/ui/textarea"

type MoodFormValues = z.infer<typeof moodSchema>

export interface ChildHandle {
  validateForm: (step: MoodFormProps["step"]) => Promise<boolean>
}
interface MoodFormProps {
  step: 1 | 2 | 3 | 4
  ref: RefObject<ChildHandle | null>
}

export function MoodForm({ step, ref }: MoodFormProps) {
  const form = useForm<MoodFormValues>({
    resolver: zodResolver(moodSchema),
    mode: "onChange",
    defaultValues: {
      emotions: [],
    },
  })
  const { isSubmitting } = form.formState

  // export the trigger function to the parent
  useImperativeHandle(ref, () => ({
    validateForm: (step: MoodFormProps["step"]) => {
      const fieldNames = Object.keys(moodSchema.shape) as (keyof z.infer<
        typeof moodSchema
      >)[]
      return form.trigger(fieldNames[step - 1])
    },
  }))

  async function onSubmit(values: MoodFormValues) {
    try {
      console.log("Submitted values:", values)
      // const { error } = await submitMood(values)
      form.reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-300 space-y-6"
        id="mood-form"
      >
        {/* Step 1: Mood Selection */}
        {step === 1 && (
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    className="gap-150 flex flex-col"
                  >
                    {moodLabels
                      .map((label, index) => ({ label, index }))
                      .reverse()
                      .map(({ label, index }) => (
                        <RadioButton
                          key={`mood-key-${index}`}
                          id={`mood-id-${index}`}
                          value={index.toString()}
                          label={label}
                          Icon={MoodIconsColor[index]}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="mt-6" />
              </FormItem>
            )}
          />
        )}

        {/* Step 2: Emotions Selection */}
        {step === 2 && (
          <FormField
            control={form.control}
            name="emotions"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>
                    Select 1-3 emotions that describe how you feel
                  </FormLabel>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {emotions.map((emotion) => (
                    <FormField
                      key={emotion}
                      control={form.control}
                      name="emotions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(emotion)}
                              onCheckedChange={(checked) =>
                                checked
                                  ? field.onChange([...field.value, emotion])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== emotion
                                      )
                                    )
                              }
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {emotion}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Step 3: Day Description */}
        {step === 3 && (
          <FormField
            control={form.control}
            name="dayDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your day</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Tell us about your day..."
                    className="min-h-[120px] resize-none"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Step 4: Sleep Hours */}
        {step === 4 && (
          <FormField
            control={form.control}
            name="sleepHours"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How many hours did you sleep?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                    className="flex flex-col space-y-2"
                  >
                    {sleepRanges.map((range, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={sleepHours[index].toString()}
                          id={`sleep-${index}`}
                        />
                        <Label
                          htmlFor={`sleep-${index}`}
                          className="cursor-pointer font-normal"
                        >
                          {range} hours
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  )
}
