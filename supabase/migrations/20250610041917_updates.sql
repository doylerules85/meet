alter table "public"."posts" drop constraint "posts_hero_image_id_media_id_fk";

drop index if exists "public"."posts_hero_image_idx";

alter table "public"."posts" drop column "hero_image_id";

alter table "public"."posts" add column "featured_image_id" integer;

CREATE INDEX posts_featured_image_idx ON public.posts USING btree (featured_image_id);

alter table "public"."posts" add constraint "posts_featured_image_id_media_id_fk" FOREIGN KEY (featured_image_id) REFERENCES media(id) ON DELETE SET NULL not valid;

alter table "public"."posts" validate constraint "posts_featured_image_id_media_id_fk";


