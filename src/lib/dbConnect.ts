import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("Please add MONGODB_URI to .env.local");
if (!dbName) throw new Error("Please add DB_NAME to .env.local");

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const dbConnect = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
};
