create sequence "public"."media_id_seq";

revoke delete on table "public"."meetings" from "anon";

revoke insert on table "public"."meetings" from "anon";

revoke references on table "public"."meetings" from "anon";

revoke select on table "public"."meetings" from "anon";

revoke trigger on table "public"."meetings" from "anon";

revoke truncate on table "public"."meetings" from "anon";

revoke update on table "public"."meetings" from "anon";

revoke delete on table "public"."meetings" from "authenticated";

revoke insert on table "public"."meetings" from "authenticated";

revoke references on table "public"."meetings" from "authenticated";

revoke select on table "public"."meetings" from "authenticated";

revoke trigger on table "public"."meetings" from "authenticated";

revoke truncate on table "public"."meetings" from "authenticated";

revoke update on table "public"."meetings" from "authenticated";

revoke delete on table "public"."meetings" from "service_role";

revoke insert on table "public"."meetings" from "service_role";

revoke references on table "public"."meetings" from "service_role";

revoke select on table "public"."meetings" from "service_role";

revoke trigger on table "public"."meetings" from "service_role";

revoke truncate on table "public"."meetings" from "service_role";

revoke update on table "public"."meetings" from "service_role";

alter table "public"."meetings" drop constraint "fk_created_by";

alter table "public"."meetings" drop constraint "meetings_pkey";

drop index if exists "public"."meetings_pkey";

drop table "public"."meetings";

create table "public"."media" (
    "id" integer not null default nextval('media_id_seq'::regclass),
    "prefix" character varying default 'media'::character varying,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now(),
    "url" character varying,
    "thumbnail_u_r_l" character varying,
    "filename" character varying,
    "mime_type" character varying,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
);


alter table "public"."payload_locked_documents_rels" add column "media_id" integer;

alter table "public"."posts" add column "hero_image_id" integer;

alter sequence "public"."media_id_seq" owned by "public"."media"."id";

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);

CREATE UNIQUE INDEX media_pkey ON public.media USING btree (id);

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);

CREATE INDEX posts_hero_image_idx ON public.posts USING btree (hero_image_id);

alter table "public"."media" add constraint "media_pkey" PRIMARY KEY using index "media_pkey";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_media_fk" FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_media_fk";

alter table "public"."posts" add constraint "posts_hero_image_id_media_id_fk" FOREIGN KEY (hero_image_id) REFERENCES media(id) ON DELETE SET NULL not valid;

alter table "public"."posts" validate constraint "posts_hero_image_id_media_id_fk";

grant delete on table "public"."media" to "anon";

grant insert on table "public"."media" to "anon";

grant references on table "public"."media" to "anon";

grant select on table "public"."media" to "anon";

grant trigger on table "public"."media" to "anon";

grant truncate on table "public"."media" to "anon";

grant update on table "public"."media" to "anon";

grant delete on table "public"."media" to "authenticated";

grant insert on table "public"."media" to "authenticated";

grant references on table "public"."media" to "authenticated";

grant select on table "public"."media" to "authenticated";

grant trigger on table "public"."media" to "authenticated";

grant truncate on table "public"."media" to "authenticated";

grant update on table "public"."media" to "authenticated";

grant delete on table "public"."media" to "service_role";

grant insert on table "public"."media" to "service_role";

grant references on table "public"."media" to "service_role";

grant select on table "public"."media" to "service_role";

grant trigger on table "public"."media" to "service_role";

grant truncate on table "public"."media" to "service_role";

grant update on table "public"."media" to "service_role";


