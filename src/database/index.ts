import mongoose from "mongoose";

export async function InitializeDB(): Promise<typeof mongoose> {
  const dbStrConnection = process.env.MONGODB_STR_CONN || "";
  const dbClient = await mongoose.connect(dbStrConnection, {});
  console.log("Connected to Mongo");
  return dbClient;
}
