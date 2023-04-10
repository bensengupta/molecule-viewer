import { z } from 'zod';

export const ElementSchema = z.object({
  code: z
    .string()
    .nonempty('Element symbol cannot be empty')
    .max(3, 'Element symbol too long'),
  name: z
    .string()
    .nonempty('Element name cannot be empty')
    .max(20, 'Element name too long'),
  color: z
    .string()
    // Regex by Royi Namir on StackOverflow
    // https://stackoverflow.com/a/8027444
    .regex(/^#[0-9A-F]{6}$/i, 'Element color must be a valid hex color'),
  radius: z
    .number()
    .positive('Element radius must be positive')
    .int('Element radius must be an integer')
    .min(1, 'Element radius too small')
    .max(100, 'Element radius too large'),
});
