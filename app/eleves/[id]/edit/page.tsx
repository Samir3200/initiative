
import { db } from "../../../db";
import { eleves, villes, examens } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import InscriptionForm from "../../../inscriptions/Components/InscriptionForm"; // Vérifie ton chemin

import DashboardButton from "../../../inscriptions/Components/DashboardButton";

export default async function EditElevePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eleveId = parseInt(id);

  const [data] = await db
    .select()
    .from(eleves)
    .leftJoin(examens, eq(eleves.id, examens.eleveId))
    .where(eq(eleves.id, eleveId));

  if (!data) return notFound();

  const toutesLesVilles = await db.select().from(villes);

  // On prépare les données pour le formulaire
  const initialData = {
    ...data.eleves,
    dateNaissance: data.eleves.dateNaissance?.toISOString().split('T')[0], // Format YYYY-MM-DD
    villeId: data.eleves.villeId?.toString(),
    diplome: data.examens?.diplome
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardButton />
      <h1 className="text-2xl font-bold mb-6">Modifier la fiche de {initialData.prenom}</h1>
      <InscriptionForm 
        villes={toutesLesVilles} 
        defaultValues={initialData} 
        isEditing={true}
        eleveId={eleveId}
      />
    </div>
  );
}