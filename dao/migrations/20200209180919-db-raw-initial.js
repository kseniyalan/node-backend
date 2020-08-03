'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    CREATE TABLE IF NOT EXISTS "images" ("id" SERIAL, "src" TEXT NOT NULL, "width" INTEGER NOT NULL, "preview" TEXT NOT NULL, "height" INTEGER NOT NULL, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "fruits" ("id" SERIAL, "name" VARCHAR(50) NOT NULL, "amount" INTEGER NOT NULL, "eaten" BOOLEAN NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "avatar" INTEGER REFERENCES "images" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TYPE "public"."enum_sessions_type" AS ENUM('fruit');
    CREATE TYPE "public"."enum_sessions_status" AS ENUM('ENABLED', 'DISABLED', 'PENDING');
    CREATE TABLE IF NOT EXISTS "sessions" ("id" SERIAL, "type" "public"."enum_sessions_type" NOT NULL, "status" "public"."enum_sessions_status" NOT NULL, "token" TEXT NOT NULL, "last_update" TIMESTAMP WITH TIME ZONE NOT NULL, "fruit_id" INTEGER REFERENCES "fruits" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    CREATE TABLE IF NOT EXISTS "refresh_tokens" ("id" SERIAL, "token" TEXT NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "session_id" INTEGER REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("id"));
    `);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS "refresh_tokens" CASCADE;
    DROP TABLE IF EXISTS "sessions" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_sessions_type";
    DROP TYPE IF EXISTS "public"."enum_sessions_status";
    DROP TABLE IF EXISTS "fruits" CASCADE;
    DROP TABLE IF EXISTS "images" CASCADE;
    `);
  },
};
