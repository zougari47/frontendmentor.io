import z from "zod"

export const loginSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email too short" })
    .max(255, { message: "Email too long" }),
  password: z.string().min(6, { message: "Password at least 6 characters" }),
})

export const signupSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email too short" })
    .max(255, { message: "Email too long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password too long" })
    .regex(/[A-Z]/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must have at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must have at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must have at least one special character",
    }),
})
