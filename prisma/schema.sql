DROP DATABASE IF EXISTS attendeaze WITH (FORCE);
CREATE DATABASE attendeaze;

\c attendeaze;

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

ALTER TABLE ONLY accounts ALTER COLUMN id SET DEFAULT nextval('accounts_id_seq'::regclass);

ALTER TABLE ONLY answers ALTER COLUMN answer_id SET DEFAULT nextval('answers_answer_id_seq'::regclass);

ALTER TABLE ONLY assessments ALTER COLUMN assessment_id SET DEFAULT nextval('assessments_assessment_id_seq'::regclass);

ALTER TABLE ONLY attendees ALTER COLUMN attendance_id SET DEFAULT nextval('attendees_attendance_id_seq'::regclass);

ALTER TABLE ONLY event_photos ALTER COLUMN photo_id SET DEFAULT nextval('event_photos_photo_id_seq'::regclass);

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);

ALTER TABLE ONLY questions ALTER COLUMN question_id SET DEFAULT nextval('questions_question_id_seq'::regclass);

ALTER TABLE ONLY sessions ALTER COLUMN id SET DEFAULT nextval('sessions_id_seq'::regclass);

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

ALTER TABLE ONLY verification_requests ALTER COLUMN id SET DEFAULT nextval('verification_requests_id_seq'::regclass);

ALTER TABLE ONLY accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);

ALTER TABLE ONLY assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (assessment_id);

ALTER TABLE ONLY attendees
    ADD CONSTRAINT attendees_pkey PRIMARY KEY (attendance_id);

ALTER TABLE ONLY event_photos
    ADD CONSTRAINT event_photos_pkey PRIMARY KEY (photo_id);

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY verification_requests
    ADD CONSTRAINT verification_requests_pkey PRIMARY KEY (id);

CREATE UNIQUE INDEX "accounts.compound_id_unique" ON accounts USING btree (compound_id);

CREATE INDEX idx_answer_question ON answers USING btree (question_id);

CREATE INDEX idx_assessment_event ON assessments USING btree (event_id);

CREATE INDEX idx_attendee_event ON attendees USING btree (event_id);

CREATE INDEX idx_attendee_user ON attendees USING btree (user_id);

CREATE INDEX idx_event_host ON events USING btree (host_id);

CREATE INDEX idx_photo_event ON event_photos USING btree (event_id);

CREATE INDEX idx_question_assessment ON questions USING btree (assessment_id);

CREATE INDEX "providerAccountId" ON accounts USING btree (provider_account_id);

CREATE INDEX "providerId" ON accounts USING btree (provider_id);

CREATE UNIQUE INDEX "sessions.access_token_unique" ON sessions USING btree (access_token);

CREATE UNIQUE INDEX "sessions.session_token_unique" ON sessions USING btree (session_token);

CREATE INDEX "userId" ON accounts USING btree (user_id);

CREATE UNIQUE INDEX "users.email_unique" ON users USING btree (email);

CREATE UNIQUE INDEX "verification_requests.token_unique" ON verification_requests USING btree (token);

ALTER TABLE ONLY answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(question_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY assessments
    ADD CONSTRAINT assessments_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY attendees
    ADD CONSTRAINT attendees_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;


ALTER TABLE ONLY event_photos
    ADD CONSTRAINT event_photos_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY questions
    ADD CONSTRAINT questions_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES assessments(assessment_id) ON UPDATE CASCADE ON DELETE SET NULL;