create sequence "public"."emails_id_seq";

create table "public"."emails" (
    "id" integer not null default nextval('emails_id_seq'::regclass),
    "subject" character varying,
    "preview" character varying,
    "content" jsonb,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


alter table "public"."payload_locked_documents_rels" add column "emails_id" integer;

alter sequence "public"."emails_id_seq" owned by "public"."emails"."id";

CREATE INDEX emails_created_at_idx ON public.emails USING btree (created_at);

CREATE UNIQUE INDEX emails_pkey ON public.emails USING btree (id);

CREATE INDEX emails_updated_at_idx ON public.emails USING btree (updated_at);

CREATE INDEX payload_locked_documents_rels_emails_id_idx ON public.payload_locked_documents_rels USING btree (emails_id);

alter table "public"."emails" add constraint "emails_pkey" PRIMARY KEY using index "emails_pkey";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_emails_fk" FOREIGN KEY (emails_id) REFERENCES emails(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_emails_fk";

grant delete on table "public"."emails" to "anon";

grant insert on table "public"."emails" to "anon";

grant references on table "public"."emails" to "anon";

grant select on table "public"."emails" to "anon";

grant trigger on table "public"."emails" to "anon";

grant truncate on table "public"."emails" to "anon";

grant update on table "public"."emails" to "anon";

grant delete on table "public"."emails" to "authenticated";

grant insert on table "public"."emails" to "authenticated";

grant references on table "public"."emails" to "authenticated";

grant select on table "public"."emails" to "authenticated";

grant trigger on table "public"."emails" to "authenticated";

grant truncate on table "public"."emails" to "authenticated";

grant update on table "public"."emails" to "authenticated";

grant delete on table "public"."emails" to "service_role";

grant insert on table "public"."emails" to "service_role";

grant references on table "public"."emails" to "service_role";

grant select on table "public"."emails" to "service_role";

grant trigger on table "public"."emails" to "service_role";

grant truncate on table "public"."emails" to "service_role";

grant update on table "public"."emails" to "service_role";


