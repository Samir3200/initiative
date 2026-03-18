import { db } from "../db";
import { eleves, examens } from "../db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";


export async function inscrireEleve(data: any) {
  try {
    // 1. Insertion de l'élève
    const [nouvelEleve] = await db.insert(eleves).values({
      nom: data.nom,
      prenom: data.prenom,
      dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
      adresse: data.adresse,
      villeId: parseInt(data.villeId),
      telephoneEleve: data.telephoneEleve,
      emailEleve: data.emailEleve,
      niveau: data.niveau,
      classe: data.classe,
      etablissement: data.etablissement,
      codeEnt: data.codeEnt,
      profPrincipal: data.profPrincipal,
      nomParent: data.nomParent,
      emailParent: data.emailParent,
      telephoneParent: data.telephoneParent,
    }).returning({ id: eleves.id });

    // 2. Si un diplôme est renseigné, on l'ajoute à la table examens
    if (data.diplome && nouvelEleve.id) {
      await db.insert(examens).values({
        eleveId: nouvelEleve.id,
        diplome: data.diplome,
        dateExamen: new Date(), // On met la date du jour par défaut
      });
    }

    revalidatePath("/inscriptions");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    if (error?.code === "23505" && error?.detail?.includes("telephone_eleve")) {
      return { success: false, message: "Ce numéro de téléphone est déjà utilisé." };
    }
    return { success: false, message: "Erreur lors de l'inscription." };
  }
}

export async function modifierEleve(id: number, data: any) {
  try {
    await db.update(eleves)
      .set({
        nom: data.nom,
        prenom: data.prenom,
        dateNaissance: data.dateNaissance ? new Date(data.dateNaissance) : null,
        adresse: data.adresse,
        villeId: parseInt(data.villeId),
        telephoneEleve: data.telephoneEleve,
        emailEleve: data.emailEleve,
        niveau: data.niveau,
        classe: data.classe,
        etablissement: data.etablissement,
        codeEnt: data.codeEnt,
        profPrincipal: data.profPrincipal,
        nomParent: data.nomParent,
        emailParent: data.emailParent,
        telephoneParent: data.telephoneParent,
      })
      .where(eq(eleves.id, id));

    // Si un diplôme est fourni, on met aussi à jour la table examens
    if (data.diplome) {
      await db.insert(examens)
        .values({ eleveId: id, diplome: data.diplome, dateExamen: new Date() })
        .onConflictDoUpdate({
          target: examens.eleveId,
          set: { diplome: data.diplome }
        });
    }

    revalidatePath("/eleves");
    revalidatePath(`/eleves/${id}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}