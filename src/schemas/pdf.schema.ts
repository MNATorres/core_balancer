import { z } from 'zod';

export const GetPdfQuerySchema = z.object({
  year: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 2026; // Default to the current 2026 World Cup!
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('Year must be a valid number');
      }
      return parsed;
    })
    .refine((val) => [2018, 2022, 2026].includes(val), {
      message: 'Year must be either 2018, 2022 or 2026. Other editions are not supported.',
    }),
});

export type GetPdfQuery = z.infer<typeof GetPdfQuerySchema>;
