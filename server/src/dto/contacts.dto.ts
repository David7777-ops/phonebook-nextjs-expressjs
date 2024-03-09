import z from "zod";
import { PHONE_REGEX } from "../config/constants";

export const ICreateContact = z
  .object({
    name: z.string(),
    phoneNumber: z.string().regex(PHONE_REGEX, "Invalid Phone Number"),
    image: z.string().optional(),
    email: z.string().email().optional(),
  })
  .strict();
