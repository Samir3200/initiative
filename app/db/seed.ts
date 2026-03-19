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
    { nom: '77100 Meaux' },
    { nom: '77470 Trilport' },
    { nom: '77480 Villenoy' },
    { nom: '77124 Cregy-les-Meaux' },
    { nom: '77120 Coulommiers' },
    { nom: '77165 St-Soupplets' },
    { nom: '77460 La Ferté-sous-Jouarre' },
    { nom: '77160 Sammeron' },
  ];

  try {
    await db.insert(villes).values(dataVilles).onConflictDoNothing();
    console.log('✅ Villes ajoutées avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
  }
}

main();