import { z } from 'zod';

export const MoleculeNameSchema = z.string().max(100, 'Molecule name too long');

export const MoleculeSchema = z.object({
  name: MoleculeNameSchema.optional(),
  fileContents: z.string().nonempty('Please choose a valid SDF file'),
});

export type MoleculeSchema = z.infer<typeof MoleculeSchema>;

export const MoleculeRenameSchema = z.object({
  from: MoleculeNameSchema,
  to: MoleculeNameSchema,
});
