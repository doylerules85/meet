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
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."meetings" ("id", "topic", "notes", "scheduled_date", "timezone_meeting", "meeting_link", "created_by", "created_at", "updated_at") VALUES
	('79d2c7d7-4187-4379-86b1-68e55c99cdd0', 'classroom', 'notes...', '2025-05-31 20:43:00+00', 'America/Phoenix', 'http://localhost:3000/rooms/coe7-jw5f', 'a5fd0f68-ea17-4823-b75a-8ae49f61f181', '2025-05-31 20:31:25.784532+00', '2025-05-31 20:31:25.784532+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



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
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
