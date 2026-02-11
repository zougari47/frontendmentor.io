import type { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonVariant =
  | "primary-red"
  | "primary-yellow"
  | "primary-white"
  | "secondary-purple"
  | "secondary-red"
  | "icon-checkmark"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

/**
 * Button component handling all 6 design variants including hover states.
 * Integrated with Tailwind 4 theme variables and utilities from style.css.
 *
 * Variants:
 * 1. primary-red: Large red button with black shadow (Idle) -> purple shadow (Hover).
 * 2. primary-yellow: Large yellow button with black shadow (Idle) -> purple shadow (Hover).
 * 3. primary-white: Large white button with black shadow (Idle) -> purple shadow (Hover).
 * 4. secondary-purple: Small purple button (Idle) -> Red (Hover).
 * 5. secondary-red: Small red button (Static version of secondary hover).
 * 6. icon-checkmark: Circular red button with checkmark icon.
 */
export function Button({
  variant = "primary-white",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-[20px] transition-all duration-200 cursor-pointer uppercase font-bold text-center border-3 border-black"

  const variantStyles: Record<ButtonVariant, string> = {
    "primary-red":
      "bg-red text-white shadow-[0px_10px_0px_0px_var(--color-black)] hover:border-dark-purple hover:shadow-[0px_10px_0px_0px_var(--color-dark-purple)] text-heading-m h-[72px] px-5 w-full",
    "primary-yellow":
      "bg-yellow text-black shadow-[0px_10px_0px_0px_var(--color-black)] hover:border-dark-purple hover:shadow-[0px_10px_0px_0px_var(--color-dark-purple)] text-heading-m h-[72px] px-5 w-full",
    "primary-white":
      "bg-white text-black shadow-[0px_10px_0px_0px_var(--color-black)] hover:border-dark-purple hover:shadow-[0px_10px_0px_0px_var(--color-dark-purple)] text-heading-m h-[72px] px-5 w-full",
    "secondary-purple":
      "bg-dark-purple text-white border-dark-purple hover:bg-red hover:border-red text-heading-xs h-[39px] px-5",
    "secondary-red":
      "bg-red text-white border-red hover:bg-dark-purple hover:border-dark-purple text-heading-xs h-[39px] px-5",
    "icon-checkmark":
      "bg-red shadow-[0px_10px_0px_0px_var(--color-black)] hover:border-dark-purple hover:shadow-[0px_10px_0px_0px_var(--color-dark-purple)] rounded-full w-16 h-16 p-0",
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ""}`

  return (
    <button className={combinedClassName} {...props}>
      <div
        className={`flex items-center ${
          variant === "icon-checkmark" ? "justify-center" : "justify-between"
        } w-full gap-4`}
      >
        {variant !== "icon-checkmark" && (
          <span className="flex-1">{children}</span>
        )}
        {icon && (
          <span className={variant === "icon-checkmark" ? "" : "flex-shrink-0"}>
            {icon}
          </span>
        )}
      </div>
    </button>
  )
}
