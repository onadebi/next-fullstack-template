// Server-only database connection
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { UserTable } from "@/db/models/UserTable";
import { PostTable } from "@/db/models/PostTable";
import appsettings from "./appsettings";

if (typeof window !== 'undefined') {
  throw new Error('Database connection should only be used on the server side');
}

const pool = new Pool({
  connectionString: appsettings.db_config.connString,
});

export const db = drizzle(pool, {
  schema: {
    UserTable,
    PostTable
  },
  logger: true
});
