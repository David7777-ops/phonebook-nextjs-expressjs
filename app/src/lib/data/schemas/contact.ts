import { z } from "zod";

export const contactSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Required"),
  phoneNumber: z.string().min(1, "Required"),
  email: z.string().email().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
