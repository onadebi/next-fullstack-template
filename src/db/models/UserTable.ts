import { pgTable, serial, uuid, timestamp, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", {length: 255}).notNull().unique(),
  full_name: varchar("full_name", {length: 255}).notNull(),
  guid: uuid("guid").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
