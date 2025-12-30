"use client"

import { emotions, Mood, moodSchema, sleepHours } from "@/schemas/mood"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn, MoodIconsColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { insertMood } from "@/app/actions/mood"

import { moodLabels, sleepRanges, TOTAL_STEPS } from "./constants"
import { RadioButton } from "./mood-radio-btn"

interface MoodFormProps {
  step: 1 | 2 | 3 | 4
  setStep: React.Dispatch<React.SetStateAction<MoodFormProps["step"]>>
  closeModal: () => void
}

export function MoodForm({ step, setStep, closeModal }: MoodFormProps) {
  const form = useForm<Mood>({
    resolver: zodResolver(moodSchema),
    mode: "onSubmit",
    defaultValues: {
      emotions: [],
      sleepHours: undefined,
    },
  })
  const { isSubmitting } = form.formState

  const updateStep = async () => {
    const field: keyof Mood = (["mood", "emotions", "dayDescription"] as const)[
      step - 1
    ]
    const isValid = await form.trigger(field)

    if (isValid)
      setStep((prev) =>
        prev < TOTAL_STEPS ? ((prev + 1) as MoodFormProps["step"]) : prev
      )
  }

  async function onSubmit(values: Mood) {
    try {
      const { error, success } = await insertMood(values)

      if (error) console.log(error)

      if (success) {
        form.reset()
        closeModal()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
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
                <FormItem>
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
                  <div className="gap-200 flex flex-wrap">
                    {emotions.map((emotion) => (
                      <FormField
                        key={emotion}
                        control={form.control}
                        name="emotions"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormControl>
                              <Checkbox
                                label={emotion}
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
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="mt-6" />
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
                  <FormControl>
                    <Textarea
                      length={field.value?.length ?? 0}
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-6" />
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
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                      className="gap-150 flex flex-col"
                    >
                      {sleepRanges.map((range, index) => (
                        <RadioButton
                          key={`sleep-key-${index}`}
                          id={`sleep-id-${index}`}
                          value={sleepHours[index].toString()}
                          label={`${range} hours`}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="mt-6" />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>

      <Button
        className={cn("w-full", step === TOTAL_STEPS ? "block" : "hidden")}
        disabled={isSubmitting}
        type="submit"
        form="mood-form"
      >
        Submit
      </Button>

      {step < TOTAL_STEPS && (
        <Button className="block w-full" onClick={updateStep}>
          Continue
        </Button>
      )}
    </>
  )
}
