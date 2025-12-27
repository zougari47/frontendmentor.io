import z from "zod"

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required, at least 3 characters")
    .max(64, "Name must be at most 64 characters"),
  avatar: z
    .union([z.instanceof(File), z.url()])
    .nullable()
    .optional()
    .refine(
      (val) => !(val instanceof File) || val.size <= 250_000,
      "File size must be under 250KB"
    )
    .refine(
      (val) =>
        !(val instanceof File) ||
        ["image/png", "image/jpeg"].includes(val.type),
      "Unsupported file type. Please upload a PNG or JPEG"
    ),
})
