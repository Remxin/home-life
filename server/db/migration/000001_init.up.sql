CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "full_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "hashed_password" varchar NOT NULL,
  "is_verified" boolean NOT NULL DEFAULT false,
  "password_changed_at" timestamptz NOT NULL DEFAULT '0001-01-01 00:00:00Z',
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "families" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "owner_id" uuid UNIQUE NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "permissions" (
  "id" uuid PRIMARY KEY,
  "family_id" uuid NOT NULL,
  "can_read" boolean NOT NULL DEFAULT true,
  "can_edit" boolean NOT NULL DEFAULT true,
  "can_create" boolean NOT NULL DEFAULT false,
  "can_modify" boolean NOT NULL DEFAULT false
);

CREATE TABLE "tasks" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" varchar NOT NULL DEFAULT '',
  "done" boolean NOT NULL DEFAULT false,
  "family_id" uuid NOT NULL,
  "created_by" uuid NOT NULL,
  "assigned_to" uuid DEFAULT null,
  "execution_date" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" uuid PRIMARY KEY,
  "created_by" uuid NOT NULL,
  "public" boolean NOT NULL DEFAULT false,
  "title" varchar NOT NULL,
  "description" varchar NOT NULL,
  "image_link" varchar NOT NULL DEFAULT ''
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "refresh_token" varchar NOT NULL,
  "user_agent" varchar NOT NULL,
  "client_ip" varchar NOT NULL,
  "is_blocked" boolean NOT NULL DEFAULT false,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "verify_emails" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "email" varchar NOT NULL,
  "secret_code" varchar NOT NULL,
  "is_used" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "expired_at" timestamptz NOT NULL
);

ALTER TABLE "families" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("id") REFERENCES "users" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("family_id") REFERENCES "families" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("family_id") REFERENCES "families" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("assigned_to") REFERENCES "users" ("id");

ALTER TABLE "recipes" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "verify_emails" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
