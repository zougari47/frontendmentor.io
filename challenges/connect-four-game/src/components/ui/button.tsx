import type { ButtonHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

export type ButtonVariant = "red" | "default"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  variant = "default",
  children,
  className,
  ...props
}: ButtonProps) {
  const style = cn(
    "max-w-100 block w-full bg-white text-center uppercase text-black",
    "border-3 text-heading-m cursor-pointer rounded-[20px] border-black py-5",
    "shadow-[0_10px_0_0_var(--color-black)] transition-all duration-200",
    "hover:shadow-dark-purple hover:border-dark-purple",
    variant === "red" && "bg-red text-white",
    className
  )

  return (
    <button className={style} {...props}>
      {children}
    </button>
  )
}

export type ButtonWithIconVariant = "red" | "yellow"

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonWithIconVariant
  icon: ReactNode
}

export function ButtonWithIcon({
  variant = "red",
  children,
  className,
  icon,
  ...props
}: ButtonWithIconProps) {
  const style = cn(
    "max-w-100 relative block w-full bg-white ps-5 text-left uppercase text-black",
    "border-3 text-heading-m cursor-pointer rounded-[20px] border-black py-5",
    "shadow-[0_10px_0_0_var(--color-black)] transition-all duration-200",
    "hover:shadow-dark-purple hover:border-dark-purple",
    variant === "red" && "bg-red text-white",
    variant === "yellow" && "bg-yellow text-black",
    className
  )

  return (
    <button className={style} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  )
}

export function MenuButton({
  children,
  className,
  ...props
}: ButtonWithIconProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-dark-purple text-heading-xs rounded-[20px] px-5 py-2.5 uppercase text-white",
        "cursor-pointer transition-colors duration-200",
        "hover:bg-red",
        className
      )}
    >
      menu
    </button>
  )
}

export function CheckButton({
  children,
  className,
  ...props
}: ButtonWithIconProps) {
  return (
    <button
      className={cn(
        "bg-red flex size-16 items-center justify-center rounded-full",
        "border-3 text-heading-m cursor-pointer border-black",
        "shadow-[0_10px_0_0_var(--color-black)] transition-all duration-200",
        "hover:shadow-dark-purple hover:border-dark-purple"
      )}
      {...props}
    >
      <span className="sr-only">close</span>
      <svg
        width="33"
        height="24"
        viewBox="0 0 33 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.06055 10.6426L11.3246 20.9066L31.1705 1.06067"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    </button>
  )
}
