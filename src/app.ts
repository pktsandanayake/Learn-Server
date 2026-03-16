import express from "express";
import router from "./Route/Route";

const app = express();

app.use(express.json());

app.use("/", router);

app.get("/ping", (_req, res) => {
  res.json({ message: "Server alive" });
});

export default app;
