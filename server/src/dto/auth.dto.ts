import { z } from "zod";

export const ILoginUser = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const ISignupUser = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
});
