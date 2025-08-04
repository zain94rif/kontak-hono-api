import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(32),
    password: z.string().min(1).max(200),
    name: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(32),
    password: z.string().min(1).max(200),
  });

  static readonly TOKEN: ZodType = z.string().min(1);

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(200).optional(),
    name: z.string().min(1).max(100).optional(),
  });
}
