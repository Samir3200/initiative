CREATE TABLE "eleves" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar(100) NOT NULL,
	"prenom" varchar(100) NOT NULL,
	"date_naissance" timestamp,
	"adresse" varchar(255),
	"telephone_eleve" varchar(50) NOT NULL,
	"email_eleve" varchar(255),
	"niveau" varchar(50) NOT NULL,
	"classe" varchar(50) NOT NULL,
	"etablissement" varchar(150),
	"prof_principal" varchar(150),
	"code_ent" varchar(50),
	"ville_id" integer,
	"nom_parent" varchar(150) NOT NULL,
	"telephone_parent" varchar(20) NOT NULL,
	"email_parent" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"diplome" varchar(100),
	CONSTRAINT "eleves_email_eleve_unique" UNIQUE("email_eleve"),
	CONSTRAINT "eleves_email_parent_unique" UNIQUE("email_parent")
);
--> statement-breakpoint
CREATE TABLE "examens" (
	"id" serial PRIMARY KEY NOT NULL,
	"eleve_id" integer,
	"date_examen" timestamp NOT NULL,
	"diplome" varchar(100) NOT NULL,
	CONSTRAINT "examens_eleve_id_unique" UNIQUE("eleve_id")
);
--> statement-breakpoint
CREATE TABLE "villes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nom" varchar(100) NOT NULL,
	CONSTRAINT "villes_nom_unique" UNIQUE("nom")
);
--> statement-breakpoint
ALTER TABLE "eleves" ADD CONSTRAINT "eleves_ville_id_villes_id_fk" FOREIGN KEY ("ville_id") REFERENCES "public"."villes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examens" ADD CONSTRAINT "examens_eleve_id_eleves_id_fk" FOREIGN KEY ("eleve_id") REFERENCES "public"."eleves"("id") ON DELETE cascade ON UPDATE no action;