import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// On récupère l'URL de la base depuis le .env.local
const sql = neon(process.env.DATABASE_URL!);

// On exporte "db" qui sera notre baguette magique pour parler à la base
export const db = drizzle(sql, { schema });