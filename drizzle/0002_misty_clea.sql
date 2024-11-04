CREATE TABLE IF NOT EXISTS "promts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"promt" text NOT NULL,
	"negative_promt" text,
	"image_url" text NOT NULL,
	"width" integer,
	"height" integer,
	"guidance_scale" integer,
	"colors" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "promt" CASCADE;