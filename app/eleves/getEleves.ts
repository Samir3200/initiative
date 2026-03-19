import { db } from "../db";
import { eleves, villes,examens } from "../db/schema";
import { desc, eq, or, ilike } from "drizzle-orm";

export async function getEleves(search?: string) {
    const trimmed = (search || "").trim();
    let whereClause = undefined;
    if (trimmed.length > 0) {
        whereClause = or(
            ilike(eleves.nom, `%${trimmed}%`),
            ilike(eleves.prenom, `%${trimmed}%`)
        );
    }
    const query = db.select({
        id: eleves.id,
        nom: eleves.nom,
        prenom: eleves.prenom,
        classe: eleves.classe,
        diplome: examens.diplome,
        codeEnt: eleves.codeEnt,
        villeNom: villes.nom,
    })
    .from(eleves)
    .where(whereClause)
    .leftJoin(villes, eq(eleves.villeId, villes.id))
    .leftJoin(examens, eq(examens.eleveId, eleves.id))
    .orderBy(desc(eleves.id));
    return await query;
}
