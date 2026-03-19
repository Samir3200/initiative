
"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eleveSchema } from "../../lib/validations/eleve";
// import { db } from "../../db";

// L'appel se fait désormais via fetch vers l'API route

interface InscriptionFormProps {
	villes: { id: number; nom: string }[];
	defaultValues?: any;
	isEditing?: boolean;
	eleveId?: number;
}

import { useState } from "react";
// import ListeElevesPage from "@/app/eleves/page";

export default function InscriptionForm({ villes, defaultValues, isEditing, eleveId }: InscriptionFormProps) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(eleveSchema),
		defaultValues,
	});

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (data: any) => {
		setSuccessMessage("");
		setErrorMessage("");
		try {
			let url = "/api/inscrire-eleve";
			let body = data;
			if (isEditing && eleveId) {
				url = "/api/modifier-eleve";
				body = { ...data, eleveId };
			}
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const result = await response.json();
			if (result.success) {
				setSuccessMessage(isEditing ? "✅ Élève modifié avec succès !" : "✅ Élève enregistré avec succès !");
				reset();
				if (isEditing) {
					window.location.reload();
				}
			} else {
				setErrorMessage("❌ Erreur : " + result.message);
			}
		} catch (error) {
			setErrorMessage("❌ Erreur serveur.");
		}
	};

	return (
		   <div>
			   <button
				   type="button"
				   onClick={() => router.push("/eleves")}
				   className="mb-4 p-2 bg-green-200 rounded-md hover:bg-green-300 transition cursor-pointer text-sm font-medium"
			   >
				   Liste des élèves
			   </button>
			   {successMessage && (
				   <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
					   {successMessage}
				   </div>
			   )}
			{errorMessage && (
				<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
					{errorMessage}
				</div>
				
			)}
			
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
				{/* SECTION 1 : ÉLÈVE */}
				<section>
					<h2 className="text-lg font-semibold text-blue-600 mb-1 flex items-center gap-2">
						<span className="bg-blue-100 p-1 rounded">👤</span> Informations de l'élève
					</h2>
					<button
						type="button"
						onClick={() => reset()}
						className="mb-2 p-2 bg-orange-200 rounded-md hover:bg-orange-300 transition cursor-pointer text-sm font-medium"
					>
						Réinitialiser
					</button>

					<div className="mb-2">
						<div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
							<div>
								<label className="text-sm font-medium text-slate-700">Nom :</label>
								<input {...register("nom")} className="w-64 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
								{errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message as string}</p>}
							</div>
							<div>
								<label className="text-sm font-medium text-slate-700">Prénom :</label>
								<input {...register("prenom")} className="w-64 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
								{errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message as string}</p>}
							</div>
							<div>
								<label className="text-sm font-medium text-slate-700">Date de Naissance :</label>
								<input
									type="date"
									{...register("dateNaissance")}
									className="w-48 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
								{errors.dateNaissance && (
									<p className="text-red-500 text-xs mt-1">{errors.dateNaissance.message as string}</p>
								)}
							</div>
						</div>
					</div>
					<div className="md:col-span-3 mt-2">
						<label className="text-sm font-medium text-slate-700">Adresse complète :</label>
						<input {...register("adresse")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-2">
						<div>
							<label className="text-sm font-medium text-slate-700">Téléphone Élève : </label>
							<input {...register("telephoneEleve")} className="w-35 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
						</div>
						<div>
							<label className="text-sm font-medium text-slate-700">Email Élève : </label>
							<input type="email" {...register("emailEleve")} className="w-60 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
							{errors.emailEleve && <p className="text-red-500 text-xs mt-1">{errors.emailEleve.message as string}</p>}
						</div>
					</div>
					<div className="flex flex-col items-center justify-center mt-2 mb-2">
						<label className="text-sm font-medium text-slate-700">Ville :</label>
						<select {...register("villeId")} className="w-50 mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-blue-500">
							<option value="">Choisir une ville...</option>
							{villes.map((v) => (
								<option key={v.id} value={v.id.toString()}>{v.nom}</option>
							))}
						</select>
						{errors.villeId && <p className="text-red-500 text-xs mt-1">{errors.villeId.message as string}</p>}
					</div>
				</div>
			</section>

			{/* SECTION 2 : SCOLARITÉ */}
				<section className="pt-2 border-t border-slate-100">
					<h2 className="text-lg font-semibold text-green-600 mb-1 flex items-center gap-2">
					<span className="bg-green-100 p-1 rounded">🎓</span> Scolarité
				</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
					<div>
						<label className="text-sm font-medium text-slate-700">Niveau :</label>
						<select {...register("niveau")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-green-500">
							<option value="Primaire">Primaire</option>
							<option value="Collège">Collège</option>
							<option value="Lycée">Lycée</option>
						</select>
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Classe :</label>
						<input {...register("classe")} placeholder="ex: 3ème" className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-green-500" />
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Établissement :</label>
						<input {...register("etablissement")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-green-500" />
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Code ENT (Identifiant)</label>
						<input
							{...register("codeEnt")}
							placeholder="ex: p.durand123"
							className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
						/>
						<p className="text-[10px] text-slate-500 mt-1 italic">Utile pour le suivi des devoirs</p>
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Professeur Principal</label>
						<input {...register("profPrincipal")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-green-500" />
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Examen préparé (le cas échéant)</label>
						<input
							{...register("diplome")}
							placeholder="ex: Bac S, Brevet..."
							className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
						/>
					</div>
				</div>
			</section>

			{/* SECTION 3 : PARENTS */}
				<section className="pt-2 border-t border-slate-100">
					<h2 className="text-lg font-semibold text-orange-600 mb-1 flex items-center gap-2">
					<span className="bg-orange-100 p-1 rounded">👪</span> Responsable Légal
				</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					<div className="md:col-span-2">
						<label className="text-sm font-medium text-slate-700">Nom et prénom du Parent :</label>
						<input {...register("nomParent")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-orange-500" />
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Email Parent :</label>
						<input {...register("emailParent")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-orange-500" />
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700">Téléphone Parent :</label>
						<input {...register("telephoneParent")} className="w-full mt-1 p-1 border rounded-md outline-none focus:ring-2 focus:ring-orange-500" />
					</div>
				</div>
			</section>

				{/* LE BOUTON DE VALIDATION */}
				<div className="pt-4 flex justify-center">
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-50 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 cursor-pointer"
					>
						{isSubmitting ? "Enregistrement..." : "Enregistrer l'élève"}
					</button>
			</div>
		</form>
		</div>
	
	);
}