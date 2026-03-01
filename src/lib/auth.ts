import { db } from "@/db/dbConfig";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

function getDatabase() {
  const environment = process.env.NODE_ENV;

  if (environment === "development") {
    return new Database("./vault.db");
  }

  return {
    db,
    type: "sqlite",
  };
}

export const auth = betterAuth({
  database: getDatabase(),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    deleteUser: { enabled: true },
  },
  plugins: [nextCookies()],
});
