import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { eq } from 'drizzle-orm';

// Action de login simples
export async function login(name: string): Promise<string> {
  // Busca usuário pelo nome
  const user = await db.select().from(users).where(eq(users.name, name)).limit(1);
  if (user.length > 0) {
    console.log(`Usuário '${name}' já existe. Logando...`);
    return `Usuário '${name}' logado.`;
  } else {
    await db.insert(users).values({ name });
    console.log(`Usuário '${name}' criado e logado.`);
    return `Usuário '${name}' criado e logado.`;
  }
} 