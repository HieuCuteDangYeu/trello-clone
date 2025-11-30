import { z } from 'zod';

export const createCardSchema = z.object({
  title: z.string().min(1, 'Word is required'),
  translation: z.string().min(1, 'Translation is required'),
  example: z.string().optional(),
  pronunciation: z.string().optional(),
  description: z.string().optional(),
  listId: z.uuid(),
  boardId: z.uuid(),
});

export type CreateCardDTO = z.infer<typeof createCardSchema>;
