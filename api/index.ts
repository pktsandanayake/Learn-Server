import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "../src/Route/Route";

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// MongoDB connection (reuse across invocations)
let cached: any = (global as any).mongoose;

async function connectDB() {
  if (cached?.conn) return cached.conn;

  const MONGO_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@learn-assignment.ipd5a.mongodb.net/?appName=${process.env.APPNAME}`;
  const conn = await mongoose.connect(MONGO_URL, {
    dbName: process.env.dbName,
  });
  cached = { conn };
  (global as any).mongoose = cached;
  return conn;
}

// Connect to DB once
connectDB().then(() => console.log("MongoDB connected"));

// Use your existing router
app.use("/", router);

// Export as serverless function
export default serverless(app);
