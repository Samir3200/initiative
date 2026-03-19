import * as z from "zod";

export const eleveSchema = z.object({
  nom: z.string().min(2, "Le nom est obligatoire"),
  prenom: z.string().min(2, "Le prénom est obligatoire"),
  dateNaissance: z.string().optional(),
  adresse: z.string().min(5, "L'adresse est requise"),
  telephoneEleve: z.string().optional(),
  emailEleve: z.string().optional(),
  niveau: z.enum(["Primaire", "Collège", "Lycée"]),
  classe: z.string().min(1, "La classe est requise (ex: 3ème)"),
  etablissement: z.string().optional(),
  codeEnt: z.string().optional(),
  profPrincipal: z.string().optional(),
  villeId: z.string().min(1, "Veuillez choisir une ville"), // On reçoit l'ID en string du <select>
  nomParent: z.string().min(2, "Nom du parent requis"),
  emailParent: z.string().email("Email invalide"),
  telephoneParent: z.string().min(10, "Numéro du parent requis"),
  diplome: z.string().optional(),
});