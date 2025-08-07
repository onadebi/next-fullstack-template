import { pgTable, serial, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./UserTable";

export const PostTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", {length: 255}).notNull(),
  content: text("content").notNull(),
  author_id: uuid("author_id").references(() => UserTable.guid, { onDelete: 'restrict' }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
