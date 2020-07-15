'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "cities" ("id"   SERIAL , "name" VARCHAR(50) NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "images" ("id"   SERIAL , "src" TEXT NOT NULL, "width" INTEGER NOT NULL, "preview" TEXT NOT NULL, "height" INTEGER NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "consultants" ("id"   SERIAL , "external_id" TEXT NOT NULL, "firebase_tokens" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[], "push_subscription" BOOLEAN NOT NULL DEFAULT true, "sso_access_token" TEXT NOT NULL, "sso_refresh_token" TEXT NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "avatar" INTEGER REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "clients" ("id"   SERIAL , "first_name" VARCHAR(50) NOT NULL, "last_name" VARCHAR(50) NOT NULL, "firebase_tokens" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[], "phone" VARCHAR(13) NOT NULL UNIQUE, "email" VARCHAR(100) NOT NULL, "is_new_consultant" BOOLEAN NOT NULL DEFAULT true, "birthday" DATE, "address" TEXT, "geo_location" JSON, "push_subscription" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "avatar" INTEGER REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "city_id" INTEGER REFERENCES "cities" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "consultant_id" INTEGER REFERENCES "consultants" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "goals" ("id"   SERIAL , "title" VARCHAR(255) NOT NULL, "icon" TEXT NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "clients_to_goals" ("is_new" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ClientId" INTEGER  REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "GoalId" INTEGER  REFERENCES "goals" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("ClientId","GoalId"));
    CREATE TYPE "public"."enum_polls_status" AS ENUM('ENABLED', 'DISABLED');
    CREATE TYPE "public"."enum_polls_for" AS ENUM('CLIENTS', 'CONSULTANTS', 'ALL');
    CREATE TABLE IF NOT EXISTS "polls" ("id"   SERIAL , "text" VARCHAR(500) NOT NULL, "status" "public"."enum_polls_status" NOT NULL DEFAULT 'ENABLED', "for" "public"."enum_polls_for" NOT NULL DEFAULT 'ALL', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "polls_answers" ("id"   SERIAL , "text" VARCHAR(500) NOT NULL, "answers_count" INTEGER NOT NULL DEFAULT 0, "polls_id" INTEGER REFERENCES "polls" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "clients_to_polls_answers" ("ClientId" INTEGER  REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "PollAnswerId" INTEGER  REFERENCES "polls_answers" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("ClientId","PollAnswerId"));
    CREATE TABLE IF NOT EXISTS "consultants_to_polls_answers" ("ConsultantId" INTEGER  REFERENCES "consultants" ("id") ON DELETE CASCADE 
    ON UPDATE CASCADE, "PollAnswerId" INTEGER  REFERENCES "polls_answers" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("ConsultantId","PollAnswerId"));
    CREATE TABLE IF NOT EXISTS "contacts" ("id"   SERIAL , "data" JSON NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "managers" ("id"   SERIAL , "login" VARCHAR(255) NOT NULL, "password" TEXT NOT NULL, PRIMARY KEY ("id")); 
    CREATE TABLE IF NOT EXISTS "messages" ("id"   SERIAL , "consultant_id" INTEGER NOT NULL, "sended_by_client" BOOLEAN NOT NULL, "message" TEXT, "viewed" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "client_id" INTEGER REFERENCES "clients" ("id") 
    ON DELETE CASCADE ON UPDATE CASCADE, "image_id" INTEGER REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TYPE "public"."enum_sessions_type" AS ENUM('client', 'consultant', 'temp_token', 'manager');
    CREATE TYPE "public"."enum_sessions_status" AS ENUM('ENABLED', 'DISABLED', 'PENDING');
    CREATE TABLE IF NOT EXISTS "sessions" ("id"   SERIAL , "type" "public"."enum_sessions_type" NOT NULL, "status" "public"."enum_sessions_status" NOT NULL, "phone" VARCHAR(255), "token" TEXT NOT NULL, "last_update" TIMESTAMP WITH TIME ZONE NOT NULL, "consultant_id" INTEGER REFERENCES "consultants" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "client_id" INTEGER REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE, "manager_id" INTEGER REFERENCES "managers" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "refresh_tokens" ("id"   SERIAL , "token" TEXT NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "session_id" INTEGER REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "target_values" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "key" VARCHAR(255) NOT NULL, "unit" VARCHAR(255) NOT NULL, "min" INTEGER NOT NULL, "max" INTEGER NOT NULL, "description" TEXT NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "users_to_polls_answers" ("id"   SERIAL , PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "verifications" ("id"   SERIAL , "phone" VARCHAR(15) NOT NULL, "actual" BOOLEAN NOT NULL DEFAULT true, "code" VARCHAR(4) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "wellness_tests" ("id"   SERIAL , "is_new" BOOLEAN NOT NULL DEFAULT true, "is_target" BOOLEAN NOT NULL DEFAULT false, "values" JSON NOT NULL, "created_at" DATE NOT NULL, "client_id" INTEGER REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "last_feed_ids" ("id" SERIAL, "last_id" INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS "consultants_badges" ("id" SERIAL, "url" TEXT, "key" VARCHAR(255) NOT NULL);
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "wellness_tests" CASCADE;
    DROP TABLE IF EXISTS "verifications" CASCADE;
    DROP TABLE IF EXISTS "users_to_polls_answers" CASCADE;
    DROP TABLE IF EXISTS "target_values" CASCADE; 
    DROP TABLE IF EXISTS "refresh_tokens" CASCADE;
    DROP TABLE IF EXISTS "contacts" CASCADE;
    DROP TABLE IF EXISTS "sessions" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_sessions_type";
    DROP TYPE IF EXISTS "public"."enum_sessions_status";
    DROP TABLE IF EXISTS "messages" CASCADE;
    DROP TABLE IF EXISTS "managers" CASCADE;
    DROP TABLE IF EXISTS "consultants_to_polls_answers" CASCADE;
    DROP TABLE IF EXISTS "clients_to_polls_answers" CASCADE;    
    DROP TABLE IF EXISTS "polls_answers" CASCADE;
    DROP TABLE IF EXISTS "polls" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_polls_status";
    DROP TYPE IF EXISTS "public"."enum_polls_for";   
    DROP TABLE IF EXISTS "clients_to_goals" CASCADE; 
    DROP TABLE IF EXISTS "goals" CASCADE;
    DROP TABLE IF EXISTS "clients" CASCADE;
    DROP TABLE IF EXISTS "consultants" CASCADE;
    DROP TABLE IF EXISTS "images" CASCADE;
    DROP TABLE IF EXISTS "cities" CASCADE;
    DROP TABLE IF EXISTS "cities" CASCADE;
    DROP TABLE IF EXISTS "last_feed_ids" CASCADE;
    DROP TABLE IF EXISTS "consultants_badges" CASCADE;
    `);
  },
};
