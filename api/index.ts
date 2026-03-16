import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "../src/Route/Route";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    credentials: true,
  }),
);

// Router
app.use("/", router);

// Health check
app.get("/ping", (_req, res) => {
  res.json({ message: "Server alive" });
});

// Vercel serverless handler
export default function handler(req: any, res: any) {
  return app(req, res);
}
