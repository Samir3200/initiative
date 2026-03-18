import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// 1. Table des VILLES (À remplir en premier pour lier les élèves)
export const villes = pgTable('villes', {
    id: serial('id').primaryKey(),
    nom: varchar('nom', { length: 100 }).unique().notNull(),
});

// 2. Table des ÉLÈVES
export const eleves = pgTable('eleves', {
    id: serial('id').primaryKey(),
    nom: varchar('nom', { length: 100 }).notNull(),
    prenom: varchar('prenom', { length: 100 }).notNull(),
    dateNaissance: timestamp('date_naissance'),
    adresse: varchar('adresse', { length: 255 }),
    telephoneEleve: varchar('telephone_eleve', { length: 50 }).unique().notNull(),
    emailEleve: varchar('email_eleve', { length: 255 }).unique(),
    niveau: varchar('niveau', { length: 50 }).notNull(), // Primaire, Collège, Lycée
    classe: varchar('classe', { length: 50 }).notNull(),
    etablissement: varchar('etablissement', { length: 150 }),
    profPrincipal: varchar('prof_principal', { length: 150 }),
    codeEnt: varchar('code_ent', { length: 50 }),
    villeId: integer('ville_id').references(() => villes.id),
    nomParent: varchar('nom_parent', { length: 150 }).notNull(),
    telephoneParent: varchar('telephone_parent', { length: 20 }).notNull(),
    emailParent: varchar('email_parent', { length: 255 }).unique(),
    createdAt: timestamp('created_at').defaultNow(),
    diplome: varchar('diplome', { length: 100 }),
});

// 3. Table des EXAMENS
export const examens = pgTable('examens', {
    id: serial('id').primaryKey(),
    eleveId: integer('eleve_id').references(() => eleves.id, { onDelete: 'cascade' }).unique(),
    dateExamen: timestamp('date_examen').notNull(),
    diplome: varchar('diplome', { length: 100 }).notNull(), // ex: Brevet, Bac, etc.
});