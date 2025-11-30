import { z } from 'zod';

export const updateCardSchema = z.object({
  title: z.string().min(1).optional(),
  translation: z.string().min(1).optional(),
  example: z.string().optional(),
  pronunciation: z.string().optional(),
  description: z.string().optional(),
  listId: z.uuid().optional(),
  position: z.number().optional(),
});

export type UpdateCardDTO = z.infer<typeof updateCardSchema>;
