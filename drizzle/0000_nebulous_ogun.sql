CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"promt_ids" text[] DEFAULT '{}'::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"promt" text NOT NULL,
	"negative_promt" text,
	"image_url" text NOT NULL,
	"width" integer,
	"height" integer,
	"guidance_scale" integer,
	"colors" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_name" text,
	"user_avatar" text
);
