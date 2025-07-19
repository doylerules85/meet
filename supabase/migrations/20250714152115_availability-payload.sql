create type "public"."enum_availability_availability_type" as enum ('single_day', 'date_range', 'recurring_weekly');

create type "public"."enum_availability_days_of_week" as enum ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

create sequence "public"."availability_days_of_week_id_seq";

create sequence "public"."availability_id_seq";

create table "public"."availability" (
    "id" integer not null default nextval('availability_id_seq'::regclass),
    "title" character varying not null,
    "availability_type" enum_availability_availability_type not null,
    "start_date" timestamp(3) with time zone not null,
    "end_date" timestamp(3) with time zone,
    "is_unavailable" boolean default true,
    "is_active" boolean default true,
    "notes" character varying,
    "timezone" character varying default 'UTC'::character varying,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."availability_days_of_week" (
    "order" integer not null,
    "parent_id" integer not null,
    "value" enum_availability_days_of_week,
    "id" integer not null default nextval('availability_days_of_week_id_seq'::regclass)
);


create table "public"."availability_time_blocks" (
    "_order" integer not null,
    "_parent_id" integer not null,
    "id" character varying not null,
    "start_time" character varying not null,
    "end_time" character varying not null,
    "description" character varying
);


alter table "public"."payload_locked_documents_rels" add column "availability_id" integer;

alter sequence "public"."availability_days_of_week_id_seq" owned by "public"."availability_days_of_week"."id";

alter sequence "public"."availability_id_seq" owned by "public"."availability"."id";

CREATE INDEX availability_created_at_idx ON public.availability USING btree (created_at);

CREATE INDEX availability_days_of_week_order_idx ON public.availability_days_of_week USING btree ("order");

CREATE INDEX availability_days_of_week_parent_idx ON public.availability_days_of_week USING btree (parent_id);

CREATE UNIQUE INDEX availability_days_of_week_pkey ON public.availability_days_of_week USING btree (id);

CREATE UNIQUE INDEX availability_pkey ON public.availability USING btree (id);

CREATE INDEX availability_time_blocks_order_idx ON public.availability_time_blocks USING btree (_order);

CREATE INDEX availability_time_blocks_parent_id_idx ON public.availability_time_blocks USING btree (_parent_id);

CREATE UNIQUE INDEX availability_time_blocks_pkey ON public.availability_time_blocks USING btree (id);

CREATE INDEX availability_updated_at_idx ON public.availability USING btree (updated_at);

CREATE INDEX payload_locked_documents_rels_availability_id_idx ON public.payload_locked_documents_rels USING btree (availability_id);

alter table "public"."availability" add constraint "availability_pkey" PRIMARY KEY using index "availability_pkey";

alter table "public"."availability_days_of_week" add constraint "availability_days_of_week_pkey" PRIMARY KEY using index "availability_days_of_week_pkey";

alter table "public"."availability_time_blocks" add constraint "availability_time_blocks_pkey" PRIMARY KEY using index "availability_time_blocks_pkey";

alter table "public"."availability_days_of_week" add constraint "availability_days_of_week_parent_fk" FOREIGN KEY (parent_id) REFERENCES availability(id) ON DELETE CASCADE not valid;

alter table "public"."availability_days_of_week" validate constraint "availability_days_of_week_parent_fk";

alter table "public"."availability_time_blocks" add constraint "availability_time_blocks_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES availability(id) ON DELETE CASCADE not valid;

alter table "public"."availability_time_blocks" validate constraint "availability_time_blocks_parent_id_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_availability_fk" FOREIGN KEY (availability_id) REFERENCES availability(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_availability_fk";

grant delete on table "public"."availability" to "anon";

grant insert on table "public"."availability" to "anon";

grant references on table "public"."availability" to "anon";

grant select on table "public"."availability" to "anon";

grant trigger on table "public"."availability" to "anon";

grant truncate on table "public"."availability" to "anon";

grant update on table "public"."availability" to "anon";

grant delete on table "public"."availability" to "authenticated";

grant insert on table "public"."availability" to "authenticated";

grant references on table "public"."availability" to "authenticated";

grant select on table "public"."availability" to "authenticated";

grant trigger on table "public"."availability" to "authenticated";

grant truncate on table "public"."availability" to "authenticated";

grant update on table "public"."availability" to "authenticated";

grant delete on table "public"."availability" to "service_role";

grant insert on table "public"."availability" to "service_role";

grant references on table "public"."availability" to "service_role";

grant select on table "public"."availability" to "service_role";

grant trigger on table "public"."availability" to "service_role";

grant truncate on table "public"."availability" to "service_role";

grant update on table "public"."availability" to "service_role";

grant delete on table "public"."availability_days_of_week" to "anon";

grant insert on table "public"."availability_days_of_week" to "anon";

grant references on table "public"."availability_days_of_week" to "anon";

grant select on table "public"."availability_days_of_week" to "anon";

grant trigger on table "public"."availability_days_of_week" to "anon";

grant truncate on table "public"."availability_days_of_week" to "anon";

grant update on table "public"."availability_days_of_week" to "anon";

grant delete on table "public"."availability_days_of_week" to "authenticated";

grant insert on table "public"."availability_days_of_week" to "authenticated";

grant references on table "public"."availability_days_of_week" to "authenticated";

grant select on table "public"."availability_days_of_week" to "authenticated";

grant trigger on table "public"."availability_days_of_week" to "authenticated";

grant truncate on table "public"."availability_days_of_week" to "authenticated";

grant update on table "public"."availability_days_of_week" to "authenticated";

grant delete on table "public"."availability_days_of_week" to "service_role";

grant insert on table "public"."availability_days_of_week" to "service_role";

grant references on table "public"."availability_days_of_week" to "service_role";

grant select on table "public"."availability_days_of_week" to "service_role";

grant trigger on table "public"."availability_days_of_week" to "service_role";

grant truncate on table "public"."availability_days_of_week" to "service_role";

grant update on table "public"."availability_days_of_week" to "service_role";

grant delete on table "public"."availability_time_blocks" to "anon";

grant insert on table "public"."availability_time_blocks" to "anon";

grant references on table "public"."availability_time_blocks" to "anon";

grant select on table "public"."availability_time_blocks" to "anon";

grant trigger on table "public"."availability_time_blocks" to "anon";

grant truncate on table "public"."availability_time_blocks" to "anon";

grant update on table "public"."availability_time_blocks" to "anon";

grant delete on table "public"."availability_time_blocks" to "authenticated";

grant insert on table "public"."availability_time_blocks" to "authenticated";

grant references on table "public"."availability_time_blocks" to "authenticated";

grant select on table "public"."availability_time_blocks" to "authenticated";

grant trigger on table "public"."availability_time_blocks" to "authenticated";

grant truncate on table "public"."availability_time_blocks" to "authenticated";

grant update on table "public"."availability_time_blocks" to "authenticated";

grant delete on table "public"."availability_time_blocks" to "service_role";

grant insert on table "public"."availability_time_blocks" to "service_role";

grant references on table "public"."availability_time_blocks" to "service_role";

grant select on table "public"."availability_time_blocks" to "service_role";

grant trigger on table "public"."availability_time_blocks" to "service_role";

grant truncate on table "public"."availability_time_blocks" to "service_role";

grant update on table "public"."availability_time_blocks" to "service_role";


