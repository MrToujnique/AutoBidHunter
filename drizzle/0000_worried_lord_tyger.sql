DO $$ BEGIN
 CREATE TYPE "public"."condition" AS ENUM('new', 'used');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_type" AS ENUM('seller', 'buyer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auction" (
	"id" serial NOT NULL,
	"starting_price" text,
	"current_price" text,
	"make" text,
	"model" text,
	"year" serial NOT NULL,
	"mileage" serial NOT NULL,
	"engine_capacity" text,
	"fuel_type" text,
	"power" serial NOT NULL,
	"transmission" text,
	"drivetrain" text,
	"vin" text,
	"body_type" text,
	"door_count" serial NOT NULL,
	"seat_count" serial NOT NULL,
	"color" text,
	"accident_free" text,
	"serviced_at_dealer" text,
	"condition" "condition",
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bid" (
	"id" serial NOT NULL,
	"amount" numeric NOT NULL,
	"auction_id" integer,
	"bidder_id" integer,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id" serial NOT NULL,
	"user_id" integer,
	"auction_id" integer,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" serial NOT NULL,
	"sender_id" integer,
	"receiver_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"first_name" text,
	"user_type" "user_type",
	"phone_number" text,
	"location" text,
	"is_company" boolean DEFAULT false,
	"email" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "won_auction" (
	"id" serial NOT NULL,
	"auction_id" integer,
	"winner_id" integer,
	"invoice_pdf" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_auction_id_auction_id_fk" FOREIGN KEY ("auction_id") REFERENCES "public"."auction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_bidder_id_user_id_fk" FOREIGN KEY ("bidder_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_auction_id_auction_id_fk" FOREIGN KEY ("auction_id") REFERENCES "public"."auction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_receiver_id_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "won_auction" ADD CONSTRAINT "won_auction_auction_id_auction_id_fk" FOREIGN KEY ("auction_id") REFERENCES "public"."auction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "won_auction" ADD CONSTRAINT "won_auction_winner_id_user_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
