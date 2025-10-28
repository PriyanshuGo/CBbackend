import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dob: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(10),
  pincode: z.string().min(5),
  street: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  isDefault: z.boolean().optional(),
});
