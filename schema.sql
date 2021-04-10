DROP DATABASE attendeaze WITH (FORCE);
CREATE DATABASE attendeaze;

\c attendeaze;


-- DO WE NEED THIS STUFF?
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
SET default_tablespace = '';
SET default_table_access_method = heap;

CREATE TABLE accounts (
    id integer NOT NULL,
    compound_id text NOT NULL,
    user_id integer NOT NULL,
    provider_type text NOT NULL,
    provider_id text NOT NULL,
    provider_account_id text NOT NULL,
    refresh_token text,
    access_token text,
    access_token_expires timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- DO WE NEED THESE SEQUENCES?
CREATE SEQUENCE accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE answers (
    answer_id bigint NOT NULL,
    answer_text character varying,
    question_id bigint,
    correct boolean
);

CREATE SEQUENCE answers_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE assessments (
    event_id bigint,
    assessment_id bigint NOT NULL
);

CREATE SEQUENCE assessments_assessment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE attendees (
    attendance_id bigint NOT NULL,
    user_id bigint,
    event_id bigint
);

CREATE SEQUENCE attendees_attendance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE event_photos (
    photo_id bigint NOT NULL,
    image character varying DEFAULT 'https://res.cloudinary.com/attendeaze/image/upload/v1617932551/attendeaze/dean_vy3zke.jpg'::character varying,
    event_id bigint
);

CREATE SEQUENCE event_photos_photo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE events (
    event_id bigint NOT NULL,
    event_name character varying DEFAULT 'NULL'::character varying NOT NULL,
    location character varying,
    date timestamp(6) with time zone,
    host_id integer,
    meeting_url character varying,
    summary character varying,
    attendee_max integer
);

CREATE SEQUENCE events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE questions (
    question_id bigint NOT NULL,
    assessment_id bigint,
    question_text character varying
);

CREATE SEQUENCE questions_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    session_token text NOT NULL,
    access_token text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE SEQUENCE sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE users (
    id integer NOT NULL,
    name text,
    email text,
    email_verified timestamp(3) without time zone,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    host_status boolean DEFAULT false,
    title character varying,
    about_me character varying,
    location character varying,
    linkedin_url character varying,
    password character varying,
    tokens character varying
);

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE verification_requests (
    id integer NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE SEQUENCE verification_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- NOT SURE WE NEED THESE ALTER TABLE RULES EITHER?
ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);


--
-- TOC entry 2878 (class 2604 OID 19872)
-- Name: answers answer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers ALTER COLUMN answer_id SET DEFAULT nextval('answers_answer_id_seq'::regclass);


--
-- TOC entry 2879 (class 2604 OID 19973)
-- Name: assessments assessment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY assessments ALTER COLUMN assessment_id SET DEFAULT nextval('assessments_assessment_id_seq'::regclass);


--
-- TOC entry 2880 (class 2604 OID 19891)
-- Name: attendees attendance_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attendees ALTER COLUMN attendance_id SET DEFAULT nextval('attendees_attendance_id_seq'::regclass);


--
-- TOC entry 2881 (class 2604 OID 19899)
-- Name: event_photos photo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_photos ALTER COLUMN photo_id SET DEFAULT nextval('event_photos_photo_id_seq'::regclass);


--
-- TOC entry 2883 (class 2604 OID 19910)
-- Name: events event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- TOC entry 2885 (class 2604 OID 19922)
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY questions ALTER COLUMN question_id SET DEFAULT nextval('questions_question_id_seq'::regclass);


--
-- TOC entry 2868 (class 2604 OID 19832)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sessions ALTER COLUMN id SET DEFAULT nextval('sessions_id_seq'::regclass);


--
-- TOC entry 2871 (class 2604 OID 19845)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 2875 (class 2604 OID 19859)
-- Name: verification_requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_requests ALTER COLUMN id SET DEFAULT nextval('verification_requests_id_seq'::regclass);


--
-- TOC entry 2888 (class 2606 OID 19826)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 2903 (class 2606 OID 19877)
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);


--
-- TOC entry 2906 (class 2606 OID 19975)
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (assessment_id);


--
-- TOC entry 2909 (class 2606 OID 19893)
-- Name: attendees attendees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attendees
    ADD CONSTRAINT attendees_pkey PRIMARY KEY (attendance_id);


--
-- TOC entry 2913 (class 2606 OID 19904)
-- Name: event_photos event_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_photos
    ADD CONSTRAINT event_photos_pkey PRIMARY KEY (photo_id);


--
-- TOC entry 2916 (class 2606 OID 19916)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- TOC entry 2920 (class 2606 OID 19927)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- TOC entry 2895 (class 2606 OID 19839)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 2898 (class 2606 OID 19853)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2901 (class 2606 OID 19866)
-- Name: verification_requests verification_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 1259 OID 19928)
-- Name: accounts.compound_id_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "accounts.compound_id_unique" ON accounts USING btree (compound_id);


--
-- TOC entry 2904 (class 1259 OID 19936)
-- Name: idx_answer_question; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_answer_question ON answers USING btree (question_id);


--
-- TOC entry 2907 (class 1259 OID 19937)
-- Name: idx_assessment_event; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_assessment_event ON assessments USING btree (event_id);


--
-- TOC entry 2910 (class 1259 OID 19938)
-- Name: idx_attendee_event; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_attendee_event ON attendees USING btree (event_id);


--
-- TOC entry 2911 (class 1259 OID 19939)
-- Name: idx_attendee_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_attendee_user ON attendees USING btree (user_id);


--
-- TOC entry 2917 (class 1259 OID 19941)
-- Name: idx_event_host; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_event_host ON events USING btree (host_id);


--
-- TOC entry 2914 (class 1259 OID 19981)
-- Name: idx_photo_event; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_photo_event ON event_photos USING btree (event_id);


--
-- TOC entry 2918 (class 1259 OID 19942)
-- Name: idx_question_assessment; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_question_assessment ON questions USING btree (assessment_id);


--
-- TOC entry 2889 (class 1259 OID 19929)
-- Name: providerAccountId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "providerAccountId" ON accounts USING btree (provider_account_id);


--
-- TOC entry 2890 (class 1259 OID 19930)
-- Name: providerId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "providerId" ON accounts USING btree (provider_id);


--
-- TOC entry 2892 (class 1259 OID 19933)
-- Name: sessions.access_token_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "sessions.access_token_unique" ON sessions USING btree (access_token);


--
-- TOC entry 2893 (class 1259 OID 19932)
-- Name: sessions.session_token_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "sessions.session_token_unique" ON sessions USING btree (session_token);


--
-- TOC entry 2891 (class 1259 OID 19931)
-- Name: userId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "userId" ON accounts USING btree (user_id);


--
-- TOC entry 2896 (class 1259 OID 19934)
-- Name: users.email_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "users.email_unique" ON users USING btree (email);


--
-- TOC entry 2899 (class 1259 OID 19935)
-- Name: verification_requests.token_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "verification_requests.token_unique" ON verification_requests USING btree (token);


--
-- TOC entry 2921 (class 2606 OID 19943)
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2922 (class 2606 OID 19949)
-- Name: assessments assessments_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY assessments
    ADD CONSTRAINT assessments_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2923 (class 2606 OID 19954)
-- Name: attendees attendees_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attendees
    ADD CONSTRAINT attendees_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2924 (class 2606 OID 19982)
-- Name: event_photos event_photos_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_photos
    ADD CONSTRAINT event_photos_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2925 (class 2606 OID 19987)
-- Name: questions questions_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES assessments(assessment_id) ON UPDATE CASCADE ON DELETE SET NULL;