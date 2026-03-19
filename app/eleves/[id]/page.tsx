import { db } from "../../db";
import { eleves, villes, examens } from "../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

// 1. On définit params comme une Promise (Standard Next.js 15)
export default async function FicheElevePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // 2. On attend la résolution des paramètres
  const resolvedParams = await params;
  const eleveId = parseInt(resolvedParams.id);

  // 3. Sécurité : si l'ID n'est pas un chiffre, on s'arrête direct
  if (isNaN(eleveId)) {
    return notFound();
  }

  // 4. On récupère l'élève
  const results = await db
    .select({
      eleve: eleves,
      ville: villes,
      examen: examens
    })
    .from(eleves)
    .leftJoin(villes, eq(eleves.villeId, villes.id))
    .leftJoin(examens, eq(eleves.id, examens.eleveId))
    .where(eq(eleves.id, eleveId));

  // 5. On vérifie si on a un résultat
  if (results.length === 0) return notFound();

  const { eleve: info, ville, examen } = results[0];

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-slate-50/50">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/eleves" className="group text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-2">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          Retour à la liste
        </Link>
        <Link 
          href={`/eleves/${info.id}/edit`}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition shadow-md"
        >
          ✏️ Modifier la fiche
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* ENTÊTE DYNAMIQUE */}
        <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Fiche Étudiant</span>
              <h1 className="text-4xl font-black capitalize mt-1">{info.prenom} {info.nom}</h1>
              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {info.classe} • {info.etablissement || "Établissement non renseigné"}
              </p>
            </div>
            {examen && (
              <div className="bg-purple-500/20 border border-purple-500/30 backdrop-blur-md text-purple-200 px-4 py-2 rounded-2xl text-sm font-bold">
                🎯 {examen.diplome}
              </div>
            )}
          </div>
          {/* Petit effet de design en fond */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* CONTENU BIEN ORGANISÉ */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* COLONNE 1 : INFOS PERSO */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-blue-500"></span>
              Coordonnées Élève
            </h2>
            <div className="space-y-4 text-slate-700">
              <p className="flex justify-between"><strong>🎂 Né(e) le :</strong> <span>{info.dateNaissance ? new Date(String(info.dateNaissance)).toLocaleDateString('fr-FR') : "N/A"}</span></p>
              <p className="flex justify-between"><strong>📱 Téléphone :</strong> <span className="font-mono">{info.telephoneEleve || "N/A"}</span></p>
              <p className="flex justify-between"><strong>📧 Email :</strong> <span className="text-blue-600">{info.emailEleve || "N/A"}</span></p>
              <p className="flex flex-col"><strong>🏠 Adresse :</strong> <span>{info.adresse}<br/>{ville?.nom}</span></p>
               <p className="text-sm"><strong>📅 Inscrit depuis :</strong> {info.createdAt ? new Date(String(info.createdAt)).toLocaleDateString('fr-FR') : "N/A"}</p>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
               <p className="text-sm"><strong>🔑 Code ENT :</strong> <code className="bg-white px-2 py-0.5 rounded border text-blue-700">{info.codeEnt || "N/A"}</code></p>
               <p className="text-sm"><strong>👨‍🏫 Prof Principal :</strong> {info.profPrincipal || "N/A"}</p>
               <p className="text-sm"><strong>🏫 Établissement :</strong> {info.etablissement || "N/A"}</p>
            </div>
          </section>

          {/* COLONNE 2 : PARENTS */}
          <section className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-green-500"></span>
              Responsable Légal
            </h2>
            <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 space-y-4">
              <div>
                <p className="text-xs text-green-600 font-bold uppercase">Nom du parent</p>
                <p className="text-lg font-bold text-slate-900">{info.nomParent}</p>
              </div>
              <div>
                <p className="text-xs text-green-600 font-bold uppercase">Contact Urgence</p>
                <p className="text-xl font-black text-green-700">{info.telephoneParent}</p>
              </div>
              <div>
                <p className="text-xs text-green-600 font-bold uppercase">Email</p>
                <p className="text-slate-700 underline">{info.emailParent}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}