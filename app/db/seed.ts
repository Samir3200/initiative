import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { villes } from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log('Seed en cours...');

  const dataVilles = [
    { nom: 'Meaux' },
    { nom: 'Trilport' },
    { nom: 'Villenoy' },
    { nom: 'Cregy-les-Meaux' },
    { nom: 'Coulommiers' },
    { nom: 'St-Soupplets' },
    { nom: 'La Ferté-sous-Jouarre' },
    { nom: 'Sammeron' },
  ];

  try {
    await db.insert(villes).values(dataVilles).onConflictDoNothing();
    console.log('✅ Villes ajoutées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
  }
}

main();