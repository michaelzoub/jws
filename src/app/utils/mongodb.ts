'use server'
import { MongoClient } from 'mongodb';

const MONGODB_URI:any = "mongodb+srv://micacao15:Omar22112003@email.0vna6wk.mongodb.net/?retryWrites=true&w=majority&appName=email" //process.env.MONGO_URI
const MONGODB_DB = "user_companies"

let cachedClient:any = null;
let cachedDb:any = null;
let client:any;
let db:any;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
