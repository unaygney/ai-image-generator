CREATE TABLE IF NOT EXISTS "promt" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"image_url" text NOT NULL,
	"width" integer,
	"height" integer,
	"guidance_scale" integer,
	"colors" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;