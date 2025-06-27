SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '74177699-362c-42ea-9c6d-bd4ffb1b55af', '{"action":"user_signedup","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-05-31 20:28:49.933951+00', ''),
	('00000000-0000-0000-0000-000000000000', '2537ee8a-3193-4c4a-b58f-8944b6e7c7e5', '{"action":"login","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-31 20:28:49.945071+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4d7d2c5-69a4-42bb-a01f-688ef5bba954', '{"action":"login","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-05-31 20:30:56.055163+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d13a837-388f-4174-9078-8e338372c61c', '{"action":"token_refreshed","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-31 21:44:13.874768+00', ''),
	('00000000-0000-0000-0000-000000000000', '248702e5-7174-4af5-9ebe-db3fb9765a9b', '{"action":"token_revoked","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-31 21:44:13.882961+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c2b6bf0-2024-46b1-bcf0-945b57b4c716', '{"action":"token_refreshed","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-31 22:43:04.94652+00', ''),
	('00000000-0000-0000-0000-000000000000', '646c523a-815e-4805-a7f9-51614e2c927b', '{"action":"token_revoked","actor_id":"a5fd0f68-ea17-4823-b75a-8ae49f61f181","actor_username":"rmdoyledesign@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-05-31 22:43:04.949354+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', 'authenticated', 'authenticated', 'rmdoyledesign@gmail.com', '$2a$10$I5v7K1OY3SrShH6I5/HLJ.wTxmcR0r80pUJKEE5A3odwW0zV.9lae', '2025-05-31 20:28:49.937665+00', NULL, '', NULL, '', NULL, '', '', NULL, '2025-05-31 20:30:56.056082+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a5fd0f68-ea17-4823-b75a-8ae49f61f181", "email": "rmdoyledesign@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-05-31 20:28:49.875293+00', '2025-05-31 22:43:04.959163+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('a5fd0f68-ea17-4823-b75a-8ae49f61f181', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', '{"sub": "a5fd0f68-ea17-4823-b75a-8ae49f61f181", "email": "rmdoyledesign@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-05-31 20:28:49.928796+00', '2025-05-31 20:28:49.928835+00', '2025-05-31 20:28:49.928835+00', 'a0bcbb52-7daf-432b-bd02-8871b1914d15');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('617034e6-ba51-46c2-b08d-3d314d59c47b', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', '2025-05-31 20:28:49.947532+00', '2025-05-31 20:28:49.947532+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '192.168.65.1', NULL),
	('51fe89a7-4e92-4e65-a4a3-31f9648a1973', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', '2025-05-31 20:30:56.056128+00', '2025-05-31 22:43:04.964091+00', NULL, 'aal1', NULL, '2025-05-31 22:43:04.964036', 'Next.js Middleware', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('617034e6-ba51-46c2-b08d-3d314d59c47b', '2025-05-31 20:28:49.959687+00', '2025-05-31 20:28:49.959687+00', 'password', '32a85555-5a83-4c08-ae82-0775e8e1016b'),
	('51fe89a7-4e92-4e65-a4a3-31f9648a1973', '2025-05-31 20:30:56.061373+00', '2025-05-31 20:30:56.061373+00', 'password', '0995f006-f509-4395-94e8-bc908595b6b4');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 's625cwfbpnwb', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', false, '2025-05-31 20:28:49.9517+00', '2025-05-31 20:28:49.9517+00', NULL, '617034e6-ba51-46c2-b08d-3d314d59c47b'),
	('00000000-0000-0000-0000-000000000000', 2, 'htgai4poiate', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', true, '2025-05-31 20:30:56.058326+00', '2025-05-31 21:44:13.883649+00', NULL, '51fe89a7-4e92-4e65-a4a3-31f9648a1973'),
	('00000000-0000-0000-0000-000000000000', 3, 'szzdduuuqy5o', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', true, '2025-05-31 21:44:13.890788+00', '2025-05-31 22:43:04.95014+00', 'htgai4poiate', '51fe89a7-4e92-4e65-a4a3-31f9648a1973'),
	('00000000-0000-0000-0000-000000000000', 4, 'n72du4cp2zcr', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', false, '2025-05-31 22:43:04.954151+00', '2025-05-31 22:43:04.954151+00', 'szzdduuuqy5o', '51fe89a7-4e92-4e65-a4a3-31f9648a1973');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."media" ("id", "prefix", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y") VALUES
	(1, 'media', '2025-06-03 15:19:00.1+00', '2025-06-03 15:18:59.763+00', NULL, NULL, 'blog.jpg', 'image/jpeg', 430608, 6016, 4000, 50, 50);


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."posts" ("id", "slug", "title", "updated_at", "created_at", "content", "featured_image_id") VALUES
	(1, 'first-post', 'Story Stones: A Creative and Interactive Classroom Activity for 3rd Graders', '2025-06-05 09:42:49.458+00', '2025-06-01 20:36:04.736+00', '{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Are you looking for a fun and imaginative activity to liven up your 3rd-grade classroom? Look no further than ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}, {"mode": "normal", "text": "Story Stones", "type": "text", "style": "", "detail": 0, "format": 3, "version": 1}, {"mode": "normal", "text": "—a hands-on, storytelling adventure that combines art, creativity, and literacy skills! ", "type": "text", "style": "", "detail": 0, "format": 2, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "What Are Story Stones?", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Story Stones are smooth pebbles or rocks that have pictures painted or drawn on them. Each stone represents a different element of a story—characters, settings, objects, or actions. Students use these stones to create and share their own stories, either independently or in small groups.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Why It’s Great for 3rd Graders", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "By 3rd grade, children are developing their storytelling abilities, vocabulary, and social skills. Story Stones tap into all these areas, encouraging:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Creative thinking", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Collaborative play", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Public speaking", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Language development", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Plus, the hands-on nature of the activity keeps even the most energetic learners engaged.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h3", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "What You’ll Need", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ul", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A collection of small, smooth stones (enough for at least one set per group)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Acrylic paint or permanent markers", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Clear sealant spray (optional, to protect the artwork)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Paper and pencils (for planning stories)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 5, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "A story prompt board or spinner (optional for added fun!)", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "bullet", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "How to Do It", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"tag": "ol", "type": "list", "start": 1, "format": "", "indent": 0, "version": 1, "children": [{"type": "listitem", "value": 1, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Create the Stones: Before the activity, either prepare a set of Story Stones yourself or involve the students in creating them. Each stone should feature a simple image: a dragon, a castle, a rainbow, a rocket, a pizza—anything that might spark imagination.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 2, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": " Sort Into Sets: Create sets with a mix of story elements. Aim for 5–10 stones per group, mixing up characters, settings, and objects.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 3, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": " Tell the Story: Divide students into small groups. Each group draws 3–5 stones at random and uses them to create a story. Give them time to brainstorm and write it out if you''d like to add a writing component.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "listitem", "value": 4, "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Share & Celebrate: Have each group present their story to the class. Encourage dramatic voices, props, or even acting out the scenes!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}], "listType": "number", "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Tips for Success", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Start with a class example to model the process.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Use a timer to keep things moving.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Encourage listening and respectful feedback during presentations.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Rotate stone sets to inspire new stories next time!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Bonus: Take It Cross-Curricular", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Art: Let students paint their own Story Stones.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Writing: Have students write and edit their stories afterward.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Social Studies: Create stones themed around historical figures or places.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Science: Use animal or weather-themed stones for a nature-focused story time.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"tag": "h2", "type": "heading", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "In Conclusion:", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr"}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Story Stones are a magical mix of fun and learning. They bring students together, spark creativity, and build essential academic and social skills—all while making your classroom buzz with laughter and imagination.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": "ltr", "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "So gather some stones and start telling your next great story today!", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr", "textFormat": 2}}', 1);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") VALUES
	(1, '2025-06-05 09:37:12.539+00', '2025-06-01 20:34:39.48+00', 'rmdoyledev@gmail.com', NULL, NULL, 'e510ae643a186a8089330848d084199260bbb1c64774c4c95e9986f6b82c73a5', '3560bcbdd36da939592f3de35eb84726aea45ca06c2b26a10fa32c27f983697f1fcf932c6e9c0ee70df2bbdec03a384225e0fb6e94abd9ad179891e9408fc58e572c83972aa4f6dada0165ecdd0eee29528627bb7ae4bf8adc3987baac41e137ad4ee4e32d93d833e1193ec7c1228a575117286516fd50f025671aa52413d6ce91761138176f2e334b3cf6d4df09bb3c7047e9662ee3ac9772e646bd08ea87ad9fb70ffbfb2e81316e3971cffa8c7a0e02675de37179b1a5614aa9146a808cd6c144a98647c1137bbf3bd81ce9b6deb0ad23e6b2a37a010c9ad490f89f4d9f06234788cc1493a4b3ecf21e80b2e14f48a17ec0110f035abfe1dcdb957765c85d135ebe4145448b4f98233b106451d354e7d73dd020943bfac88a51ece79f94699a409b0fa27a8c3706dd506543738e2b4f1105f320f851c52d3e7e5ebef8fe3a24c9fe57c17b54b8bc198b2d103cc61af536d0567284aeac5379045d6c47c2e664f29fde7e19808acd287d8a89c972da5b6c75c54b9c1d18718d0ad84bf159810a438114b2249892c7b2073c5d88449ca6afa1666ecaa5f3b2ab3d67a5b6b3e124b89d2f4e903ef9ad4cac8345070ecbd62db50dc83b39e19cb5408ceac022152a340e7f58852935207bbe914e7b513b365d8d442875aab32acc8f1b39e85ab86082541ab84dab4a5766d6f62729f25f55a258b90365c232ece079bcdf1baa72', 2, NULL);


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payload_migrations" ("id", "name", "batch", "updated_at", "created_at") VALUES
	(1, 'dev', -1, '2025-06-05 05:06:29.66+00', '2025-06-01 20:33:30.654+00');


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payload_preferences" ("id", "key", "value", "updated_at", "created_at") VALUES
	(1, 'posts-list', '{"preset": null}', '2025-06-01 20:34:42.491+00', '2025-06-01 20:34:42.492+00'),
	(2, 'users-list', '{"limit": 10, "preset": null}', '2025-06-03 05:31:20.011+00', '2025-06-03 05:31:17.235+00'),
	(3, 'media-list', '{"preset": null}', '2025-06-03 15:02:52.383+00', '2025-06-03 15:02:52.309+00'),
	(4, 'nav', '{"groups": {"Collections": {"open": true}}}', '2025-06-03 15:14:56.694+00', '2025-06-03 15:14:56.413+00');


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payload_preferences_rels" ("id", "order", "parent_id", "path", "users_id") VALUES
	(1, NULL, 1, 'user', 1),
	(3, NULL, 2, 'user', 1),
	(4, NULL, 3, 'user', 1),
	(6, NULL, 4, 'user', 1);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- INSERT INTO "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") VALUES
-- 	('supabase-payload', 'media', '2025-06-03 15:19:00.0764+00', '2025-06-03 15:19:00.0764+00');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 4, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."media_id_seq"', 33, true);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payload_locked_documents_id_seq"', 44, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payload_locked_documents_rels_id_seq"', 55, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payload_migrations_id_seq"', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payload_preferences_id_seq"', 35, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payload_preferences_rels_id_seq"', 36, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."posts_id_seq"', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 1, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
