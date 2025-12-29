import { getCurrentDate } from "@/lib/utils"

type GreetingProps = {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  const today = getCurrentDate()

  return (
    <div className="my-600 lg:my-800 space-y-200 md:space-y-125 text-center">
      <span className="txt-preset-3-mobile md:txt-preset-3 block text-blue-600">
        Hello, {name}!
      </span>
      <h1 className="txt-preset-1-mobile md:txt-preset-1 text-neutral-900">
        How are you feeling today?
      </h1>
      <span className="txt-preset-6 block text-neutral-600">{today}</span>
    </div>
  )
}
