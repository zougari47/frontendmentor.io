import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "px-200 py-150 rounded-10 bg-neutral-0 txt-preset-6-regular w-full border border-neutral-300 text-neutral-600 shadow-[0px_1px_2px_#21214d0d]",
        "hover:border-neutral-600",
        "focus:outline-2 focus:outline-offset-2 focus:outline-blue-600",
        "active:border-neutral-600 active:text-neutral-900",
        "aria-invalid:border-red-700 aria-invalid:text-neutral-600 invalid:border-red-700 invalid:text-neutral-600",
        className
      )}
      {...props}
    />
  )
}

export { Input }
