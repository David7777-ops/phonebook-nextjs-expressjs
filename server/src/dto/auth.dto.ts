import { z } from "zod";

export const ILoginUser = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const ISignupUser = z
  .object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
  })
  .strict();
