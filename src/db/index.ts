import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

const missingDatabaseUrlMessage =
  "DATABASE_URL is not set. Add it to your .env.local file.\n" +
  "Format: postgresql://user:password@host/dbname?sslmode=require";

const createConnection = (url: string) => {
  const sql = neon(url);

  return {
    sql,
    db: drizzle(sql, { schema }),
  };
};

const createMissingDatabaseUrlProxy = <T extends object>() =>
  new Proxy({} as T, {
    get() {
      throw new Error(missingDatabaseUrlMessage);
    },
    apply() {
      throw new Error(missingDatabaseUrlMessage);
    },
  });

const connection = connectionString ? createConnection(connectionString) : null;

export const sql =
  connection?.sql ??
  createMissingDatabaseUrlProxy<ReturnType<typeof createConnection>["sql"]>();
export const db =
  connection?.db ??
  createMissingDatabaseUrlProxy<ReturnType<typeof createConnection>["db"]>();

export type DB = typeof db;
