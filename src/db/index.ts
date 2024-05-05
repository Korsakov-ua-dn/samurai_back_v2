<<<<<<< Updated upstream
export * from "./methods";
export { runDb } from "./db";
export type * from "./types";
=======
const mongoUri =
  process.env.mongoUri || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";

export const client = new MongoClient();

export async function runDb() {}
>>>>>>> Stashed changes
