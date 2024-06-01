import { MongoClient } from "mongodb";

const mongoUri =
  process.env.mongoUri || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority";

const client = new MongoClient(mongoUri);

export const db = client.db("samurai_back_v2");

export async function runDb() {
  try {
    await client.connect();
    await client.db("courses").command({ ping: 1 });
    console.log("connect successful");
  } catch {
    console.log("cant connect to db");
    await client.close();
  }
}
