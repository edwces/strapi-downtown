"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: env("DATABASE_HOST", "localhost"),
            port: env.int("DATABASE_PORT", 5433),
            database: env("DATABASE_NAME", "postgres"),
            user: env("DATABASE_USERNAME", "user"),
            password: env("DATABASE_PASSWORD", "pass"),
            schema: env("DATABASE_SCHEMA", "public"), // Not required
        },
        debug: false,
    },
});
