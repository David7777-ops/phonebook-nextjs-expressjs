import { z } from "zod";

export const ISignupUser = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
});
