import mongoose from "mongoose";
import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const mongoURI: string = process.env.MONGO_URI!;

export async function connectMongo() {
  try {
    await mongoose.connect(mongoURI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Successfully connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("Error connecting to Database");
      console.error("Error: ", error.message);
      process.exit();
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Something went wrong");
      console.error("Error Name:", error.name);
      console.error("Error Message: ", error.message);
    }
  }
}

export const db = new Kysely({
  dialect: new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  }),
});
