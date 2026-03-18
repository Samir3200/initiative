import { db } from "../db";
import { eleves, villes, examens } from "../db/schema";
import { eq, desc, ilike, or } from "drizzle-orm";
import Search from "./search";
import Link from "next/link";
import DashboardButton from "../inscriptions/Components/DashboardButton";

export default async function ListeElevesPage({
    searchParams,
}: {
    searchParams?: Promise<{ query?: string }>;
}) {
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const query = resolvedSearchParams?.query || "";

    // Requête filtrée
    const liste = await db
        .select({
            id: eleves.id,
            nom: eleves.nom,
            prenom: eleves.prenom,
            classe: eleves.classe,
            villeNom: villes.nom,
            diplome: examens.diplome,
        })
        .from(eleves)
        .leftJoin(villes, eq(eleves.villeId, villes.id))
        .leftJoin(examens, eq(eleves.id, examens.eleveId))
        .where(
            or(
                ilike(eleves.nom, `%${query}%`),
                ilike(eleves.prenom, `%${query}%`)
            )
        )
        .orderBy(desc(eleves.createdAt));

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen bg-slate-50/30">
            <DashboardButton />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Effectifs</h1>
                    <p className="text-slate-500 text-sm">{liste.length} élève(s) trouvé(s)</p>
                </div>
                <Link
                    href="/inscriptions"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-100"
                >
                    + Nouvel Élève
                </Link>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <Search />
            </div>

            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-bold">Élève</th>
                            <th className="p-4 font-bold">Ville</th>
                            <th className="p-4 font-bold">Classe</th>
                            <th className="p-4 font-bold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                        {liste.map((eleve) => (
                            <tr key={eleve.id} className="hover:bg-blue-50/30 transition group">
                                <td className="p-4">
                                    <div className="font-bold text-slate-900 capitalize">{eleve.prenom} {eleve.nom}</div>
                                    {eleve.diplome && (
                                        <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                                            {eleve.diplome}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-slate-600">{eleve.villeNom}</td>
                                <td className="p-4 text-slate-600">{eleve.classe}</td>
                                <td className="p-4 text-right">
                                    <Link
                                        href={`/eleves/${eleve.id}`}
                                        className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md font-bold hover:bg-blue-600 hover:text-white transition-all text-xs"
                                    >
                                        Détails
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {liste.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center gap-2">
                        <span className="text-4xl">🔎</span>
                        <p className="text-slate-400 italic">Aucun élève ne correspond à "{query}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}