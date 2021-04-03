-- CreateTable
CREATE TABLE "answers" (
    "answer_id" BIGSERIAL NOT NULL,
    "answer_text" VARCHAR,
    "question_id" BIGINT,
    "correct" BOOLEAN,

    PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "assessment_id" BIGSERIAL NOT NULL,
    "event_id" BIGINT,

    PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "attendees" (
    "attendance_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "event_id" BIGINT,

    PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "event_photos" (
    "photo_id" BIGSERIAL NOT NULL,
    "image" VARCHAR,
    "event_id" BIGINT,

    PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" BIGSERIAL NOT NULL,
    "event_name" VARCHAR NOT NULL DEFAULT E'NULL',
    "location" VARCHAR,
    "date" TIMESTAMPTZ(6),
    "host_id" BIGINT,
    "meeting_url" VARCHAR,
    "summary" VARCHAR,
    "attendee_max" INTEGER,

    PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" BIGSERIAL NOT NULL,
    "assessment_id" BIGINT,
    "question_text" VARCHAR,

    PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "email" VARCHAR NOT NULL DEFAULT E'NULL',
    "host_status" BOOLEAN DEFAULT false,
    "title" VARCHAR,
    "about_me" VARCHAR,
    "location" VARCHAR,
    "profile_photo" VARCHAR,
    "linkedin_url" VARCHAR,

    PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_answer_question" ON "answers"("question_id");

-- CreateIndex
CREATE INDEX "idx_assessment_event" ON "assessments"("event_id");

-- CreateIndex
CREATE INDEX "idx_attendee_event" ON "attendees"("event_id");

-- CreateIndex
CREATE INDEX "idx_attendee_user" ON "attendees"("user_id");

-- CreateIndex
CREATE INDEX "idx_photo_event" ON "event_photos"("event_id");

-- CreateIndex
CREATE INDEX "idx_event_host" ON "events"("host_id");

-- CreateIndex
CREATE INDEX "idx_question_assessment" ON "questions"("assessment_id");

-- AddForeignKey
ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendees" ADD FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendees" ADD FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_photos" ADD FOREIGN KEY ("event_id") REFERENCES "events"("event_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD FOREIGN KEY ("host_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD FOREIGN KEY ("assessment_id") REFERENCES "assessments"("assessment_id") ON DELETE SET NULL ON UPDATE CASCADE;
