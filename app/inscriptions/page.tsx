import { db } from "../db";
import { villes } from "../db/schema";
import InscriptionForm from "./Components/InscriptionForm"; // Import relatif

export default async function InscriptionPage() {
  try {
    const listeVilles = await db.select().from(villes);
    
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Inscription d'un élève</h1>
        <InscriptionForm villes={listeVilles} />
      </div>
    );
  } catch (error) {
    console.error("Erreur DB:", error);
    return <div>Erreur lors du chargement des villes. Vérifie ta console terminal.</div>;
  }
}