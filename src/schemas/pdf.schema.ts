import { z } from 'zod';

export const GetPdfQuerySchema = z.object({
  year: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 2022; // default if undefined/empty
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error('Year must be a valid number');
      }
      return parsed;
    })
    .refine((val) => [2018, 2022].includes(val), {
      message: 'Year must be either 2018 or 2022. Other editions are not supported.',
    }),
});

export type GetPdfQuery = z.infer<typeof GetPdfQuerySchema>;
