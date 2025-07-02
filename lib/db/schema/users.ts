import { nanoid } from '@/lib/utils';
import { relations } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { embeddings } from './embeddings';

export const users = pgTable('users', {
	id: varchar('id', { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
	name: text('name'),
});

export const embeddingsRelations = relations(embeddings, ({ one }) => ({
  resource: one(embeddings, {
    fields: [embeddings.userId],
    references: [embeddings.id],
  }),
}));

