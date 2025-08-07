import { pgTable, serial, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";


export const UserTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", {length: 255}).notNull().unique(),
  full_name: varchar("full_name", {length: 255}).notNull(),
  guid: uuid("guid").notNull().unique().defaultRandom(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// Type for User with all fields from the table
export type User = InferSelectModel<typeof UserTable>;

// Type for inserting a new user (only required fields)
export type InsertUser = InferInsertModel<typeof UserTable>;

// Type for User without timestamps (useful for creating users)
export type IUser = Omit<User, 'created_at' | 'updated_at' | 'id' |'guid'>;

export type IUserDetail = Omit<User, 'created_at' | 'updated_at'> & {
  created_at: Date;
  updated_at: Date;
  id: number;
  guid: string;
};


export const IUserPlaceholder: IUserDetail = {
  email: '',
  full_name: '',
  guid: '',
  id: 0,
  created_at: new Date(),
  updated_at: new Date()
};