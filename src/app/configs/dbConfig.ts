import {defineConfig } from "drizzle-kit";
import appsettings from "./appsettings";

export default defineConfig({
    schema: [
        "./src/db/models/*.ts"
    ],
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials:{
        url: appsettings.db_config.connString as string,
    },
    verbose: true,
    strict: true,
});