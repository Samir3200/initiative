import Search from "./search";
import Link from "next/link";
import DashboardButton from "../inscriptions/Components/DashboardButton";
import ElevesTable from "./ElevesTable";
import { getEleves } from "./getEleves";

export default async function ListeElevesPage({ searchParams }: { searchParams?: { query?: string } }) {
    let search = "";
    if (searchParams) {
        const params = await searchParams;
        search = params?.query || "";
    }
    const liste = await getEleves(search);
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

            <ElevesTable liste={liste} />
        </div>
    );
                
            

            {liste.length === 0 && (
                <div className="p-20 text-center flex flex-col items-center gap-2">
                    <span className="text-4xl">🔎</span>
                    <p className="text-slate-400 italic">Aucun élève trouvé</p>
                </div>
            )}
}