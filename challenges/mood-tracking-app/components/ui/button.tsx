import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("block cursor-pointer", {
  variants: {
    variant: {
      default: cn(
        "rounded-10 txt-preset-5 text-neutral-0 px-400 py-150 bg-blue-600",
        "hover:bg-blue:700",
        "focus:outline-2 focus:outline-offset-2 focus:outline-blue-600",
        "cursor-not-allowed disabled:bg-blue-200"
      ),
      secondary: cn(
        "rounded-8 px-200 py-100 bg-neutral-0 txt-preset-6 border border-neutral-300 text-neutral-900 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]",
        "hover:border-neutral-900",
        "focus:border-neutral-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
      ),
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button }
