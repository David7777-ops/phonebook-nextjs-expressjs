import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be 8 characters or longer."),
});

export type Login = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1, "Required"),
    phoneNumber: z.string().min(1, "Required"),
    password: z.string().min(8, "Password must be 8 characters or longer."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignUp = z.infer<typeof signUpSchema>;
