import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Route/Route";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    credentials: true,
  }),
);

// routes
app.use("/", router);

// health check
app.get("/ping", (_req, res) => {
  res.json({ message: "Server alive" });
});

export default app;
