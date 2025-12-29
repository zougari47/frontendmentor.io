import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

interface MoodRadioProps {
  id: string
  value: string
  label: string
  Icon?: React.ComponentType<{ size?: number }>
}

export const RadioButton = ({ id, value, label, Icon }: MoodRadioProps) => {
  return (
    <Label
      htmlFor={id}
      className="rounded-10 gap-150 bg-neutral-0 px-250 py-150 flex w-full items-center border-2 border-blue-100 has-[[data-state=checked]]:border-blue-600"
    >
      <RadioGroupItem id={id} value={value} />
      <span className="txt-preset-5 block text-neutral-900">{label}</span>

      {Icon && (
        <span className="ml-auto block [&>svg]:h-[38px] [&>svg]:w-[38px]">
          <Icon />
        </span>
      )}
    </Label>
  )
}
