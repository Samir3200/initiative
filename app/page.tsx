import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Initiative Réussite</h1>
        <p className="text-slate-600 mb-8">Plateforme de gestion de l'association</p>
        
        <Link 
          href="/inscriptions" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          📝 Inscrire un nouvel élève
        </Link>
        <Link 
          href="/eleves" 
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md active:scale-95 mt-4"
        >
          📋 Voir la liste des élèves
        </Link>
      </div>
      <div className="mt-10 text-sm text-slate-500">
        <p>Développé par Samir ELORF</p>
        <p>© 2026 Initiative Réussite. Tous droits réservés.</p>
       </div>
    </div>
  );
}