import mongoose from "mongoose";

interface Cached {
  conn: typeof mongoose | null;
}

declare global {
  var mongooseCache: Cached | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null };
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  const conn = await mongoose.connect(process.env.MONGO_URI!, {
    dbName: process.env.DB_NAME,
  });

  cached!.conn = conn;

  console.log("MongoDB connected");

  return conn;
}
