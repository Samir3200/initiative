"use client";
import Link from "next/link";

export default function ElevesTable({ liste }: { liste: any[] }) {
    function handleDelete(id: number) {
        // Suppression directe sans popup
        fetch(`/api/supprimer-eleve?id=${id}`, { method: "DELETE" }).then(() => window.location.reload());
    }
    return (
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-100">
            <div className="flex justify-end p-4">
                <a
                    href="/api/export-eleves"
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-bold hover:bg-green-700 transition-all text-xs"
                    download
                >
                    Exporter Excel
                </a>
            </div>
            <table className="w-full text-left">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-4 font-bold">Élève</th>
                        <th className="p-4 font-bold">Ville</th>
                        <th className="p-4 font-bold">Classe</th>
                        <th className="p-4 font-bold text-right">Action</th>
                        <th className="p-4 font-bold text-right">Supprimer</th>
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
                                {eleve.codeEnt && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                                        {eleve.codeEnt}
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
                            <td className="p-4 text-right">
                                <button
                                    className="bg-red-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-red-700 transition-all text-xs cursor-pointer"
                                    onClick={() => handleDelete(eleve.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

